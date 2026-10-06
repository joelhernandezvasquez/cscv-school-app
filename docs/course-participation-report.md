# Course Participation Report

## Context

When planning an event (e.g. the Pablo retreat), there is currently no way to answer "who has already done this course?" and, more importantly, "who has **not** done it yet, so I can call and invite them?". Today the app can only answer this one student at a time — `getStudentProgress`, `getPendingCoursesList` and `getCompletedCoursesList` in `src/lib/actions/students/index.ts` are all per-student detail views used on the student profile page.

This adds a new **Reports** section to the sidebar whose first report, **Course Participation**, lets you pick a course, flip between "Has completed" and "Has not completed", search/paginate the resulting people, and export the list to CSV to work the call list offline.

Decisions:
- A new backend endpoint is added (no N+1 composition on the frontend).
- The query is driven by **course**, not event.
- The sidebar gets a **Reports** parent item with sub-items underneath it.
- The list needs **CSV export**.

---

## 1. Backend contract (external API, not in this repo)

The frontend is written against this exact shape:

```
GET /course/:courseId/participation
    ?status=completed|pending     (required)
    &query=<free text>            (optional — matches name / email / phone)
    &page=<1-based>               (optional, default 1)
    &pageSize=<number>            (optional, default matches the students page size)

200 →
{
  "totalPages": 4,
  "totalCount": 37,
  "completedCount": 37,          // total who completed this course, ignores `query`
  "pendingCount": 112,           // total who have not, ignores `query`
  "students": [
    {
      "id": 12,
      "first_name": "Ana",
      "last_name": "Perez",
      "email": "ana@x.com",
      "phone": "809-000-0000",
      "gender": "F",
      "active": true,
      "completeAt": "2025-03-14T00:00:00.000Z"   // null when status=pending
    }
  ]
}
```

Notes for the backend:
- `pending` = active students with **no** completed `StudentCourses` row for that `course_id`. Inactive students are excluded (they are not callable) — the UI assumes active-only.
- `completedCount` / `pendingCount` are returned on every call so the summary cards need no extra request.
- `pageSize` must accept a large value (the CSV export asks for `pageSize=5000` in a single call).
- `totalPages` / `totalCount` must reflect the **filtered** result (unlike `/student/pagination`, which ignores the search query — that existing inconsistency is not fixed here).

---

## 2. Types

Add to `src/types/index.ts`, next to the existing `Students` / `PaginationData`:

```ts
export type ParticipationStatus = 'completed' | 'pending';

export interface CourseParticipant {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  active: boolean;
  completeAt: Date | null;
}

export interface CourseParticipationResult {
  totalPages: number;
  totalCount: number;
  completedCount: number;
  pendingCount: number;
  students: CourseParticipant[];
}
```

## 3. Data layer

**New shared helper** — `src/lib/actions/utils.ts`: move `parseJsonResponse` out of `src/lib/actions/dashboard/index.ts` (it is currently a private copy there) into this plain, non-`'use server'` module and have `dashboard/index.ts` import it. It must **not** go in `src/lib/actions/index.ts`, which is `'use server'` — exports there become server actions and a `Response` argument is not serializable.

**New domain** — `src/lib/actions/reports/index.ts`, following the same token → fetch → typed return → `catch` with `console.log` + rethrow pattern as every other domain:

- `getCourseParticipation(courseId: string, status: ParticipationStatus, query?: string, page?: string | number): Promise<CourseParticipationResult>`
  - `getValidatedToken()` → `GET ${NEXT_PUBLIC_SERVER_URL}/course/${courseId}/participation?...` with `Authorization: Bearer`.
  - Build the query string with `URLSearchParams` and only append `query`/`page` when present — do **not** repeat the `fetchStudents` bug where undefined values are interpolated as the literal string `undefined`.
  - Return through `parseJsonResponse<CourseParticipationResult>`.
- `getCourseParticipationExport(courseId, status, query?)` — same call with `pageSize=5000`, `page=1`; returns `CourseParticipant[]`.

## 4. Routes

- `src/app/(admin)/reports/page.tsx` — small landing page listing the available reports as cards (only Course Participation today), so the section has somewhere to grow. `metadata.title = 'Reports'`.
- `src/app/(admin)/reports/course-participation/page.tsx` — `export const dynamic = 'force-dynamic'`, async server component reading `searchParams: { courseId?, status?, query?, page? }`, modelled directly on `src/app/(admin)/students/page.tsx`:
  - `const courses = await fetchCourses()` (from `src/lib/actions/courses/index.ts`) to populate the course picker.
  - Defaults: `status = searchParams?.status ?? 'pending'` (the invite use case is the primary one), `page = Number(searchParams?.page) || 1`.
  - When no `courseId` is present, render an empty state ("Pick a course to see who has or hasn't completed it") instead of the table — no fetch.
  - Otherwise `<Suspense key={courseId + status + query + currentPage} fallback={<TableSkeleton/>}>` around the table component. Note the key includes **every** filter, unlike the students page whose key omits `sortBy`.

Both live under the `(admin)` route group, so they inherit the `auth()` guard in `src/app/(admin)/layout.tsx`.

## 5. Components

New folder `src/components/Reports/`, each component paired with a co-located `style.module.css` (the convention for non-`ui/` components), reusing `src/components/ui/` primitives:

- **`CourseParticipationFilters/`** (client) — one row containing:
  - Course picker: reuses `src/components/ui/dropdown/Dropdown.tsx` + `UseToggle` + `UseClickAway`, styled like `src/components/Course/filter-course-tabs/FilterCourseTabs.tsx`. Items are `${course.name} — ${formatCourseLevelName(course.level)}` from `src/lib/utils.ts`; it writes the course **id** to `courseId`, so it needs the `Courses[]` list passed as a prop and a label→id map. Initialize state from `searchParams` (as `FilterCourseTabs` does — not the desynced pattern in `FilterDropdown`/`SortByStudents`).
  - Status segmented control: two buttons, "Has not completed" / "Has completed", writing `status=pending|completed`.
  - Both reset `page=1` and **preserve** the other params via `new URLSearchParams(searchParams)`.
  - Reuse the existing `src/components/ui/search/Search.tsx` component as-is for the `query` param (it already debounces and resets `page`).
- **`CourseParticipationSummary/`** — two stat cards ("Completed: N" / "Not yet: N") fed by `completedCount` / `pendingCount`. Renders nothing until a course is selected.
- **`CourseParticipationTable/`** (async server) — calls `getCourseParticipation`, then renders both layouts the way `src/components/Students/StudentContentTable/StudentContentTable.tsx` does: a `<ul>` of cards for mobile and a shadcn `Table` for desktop, toggled by CSS. Columns: Name (`Avatar` + name + email), Phone, Completed On (`getFormattedDate(completeAt)` or `—` for pending), Status `<Badge/>`. Phone and email are click-to-copy (`navigator.clipboard`) via a tiny client `CopyableValue` component with a transient "Copied" state. Also renders the summary and the export button, since it is the only place that has the counts.
- **`ExportParticipationButton/`** (client) — calls `getCourseParticipationExport`, builds a CSV string (`First Name,Last Name,Email,Phone,Status,Completed On`, values quoted and internal quotes doubled), and downloads it via a `Blob` + object URL. Filename `${courseName}-${status}.csv`. Shows a pending/disabled state while fetching; disabled when no course is selected.

**Pagination** — reuse `src/components/ui/pagination/PaginationContainer.tsx`, but its `buildHref` only carries `query` and `sortBy`, which would drop `courseId`/`status` on every page click. Add an optional `extraParams?: Record<string, string | undefined>` prop and merge it into `buildHref` (skipping undefined values). This is backward compatible — the students page keeps working untouched.

## 6. Sidebar nesting

`src/components/Navigation/Navigation.tsx` currently renders a flat list. Extend it:

- Give nav items an optional `children` array and add:
  ```ts
  {
    id: '006-reports',
    item: 'Reports',
    url: '/reports',
    icon: <TbReportAnalytics size={24} />,   // react-icons/tb
    children: [
      { id: '006-01-participation', item: 'Course Participation', url: '/reports/course-participation' }
    ]
  }
  ```
- An item with `children` renders as a button with a `ChevronDown` (lucide, already used elsewhere) that rotates when open, plus a nested `<ul>` of child `<Link>`s. Open state via `UseToggle`, initialized open when `usePathname().startsWith('/reports')`.
- Active state: keep the existing `getPageNameFromPath(currentPath) === navItem.item` check for the parent — it already resolves `/reports/course-participation` to `"Reports"`. For children, compare `currentPath === child.url` directly.
- `closeMenu` must fire when a **child** link is clicked (mobile menu), not just top-level ones.
- Add matching `.nav_sublist` / `.nav_sublink` / `.active_sublink` rules to `src/components/Navigation/style.module.css`, indented under the parent and using the existing `--primary_blue` / `--primary_black` tokens.
- While here, delete the dead duplicate `navigationItems` array at the top of `src/lib/constants.tsx` — nothing imports it and leaving it will invite drift now that nav items have structure.

## 7. Out of scope

Bulk-enrolling the resulting students into an event (view + CSV only for now). The endpoint and table are shaped so a selection column could be added later on top of the existing `enrollStudentIntoEvent` action.

---

## Verification

1. `npm run lint` and `npm run build` pass.
2. `npm run dev`, log in, and confirm the sidebar shows **Reports** with **Course Participation** nested under it; the group expands, the child highlights when active, and on mobile the menu closes when the child is tapped.
3. On `/reports/course-participation` with no course selected: empty state, no network call to the participation endpoint, export button disabled.
4. Pick a course:
   - Default view is "Has not completed"; counts in the summary match `completedCount + pendingCount` ≈ the active student total.
   - Flip to "Has completed" — rows change, `Completed On` shows real dates, and the URL carries `status=completed`.
   - Spot-check one name against that student's profile page (`/students/[id]`), whose `getCompletedCoursesList` / `getPendingCoursesList` are the independent source of truth.
5. Type in the search box: results narrow, the URL keeps `courseId` and `status`, and `page` resets to 1.
6. Click page 2: `courseId`, `status` and `query` all survive in the URL (this is the `extraParams` change) and the rows differ from page 1.
7. Click **Export CSV** on a filtered result: the downloaded file contains **all** matching rows, not just the current page, and opens cleanly in Sheets/Excel (check a name containing a comma or an accent).
8. Confirm the students page pagination still behaves exactly as before, since `PaginationContainer` was modified.
https://claude.ai/artifact/VMCj4pYynAXB7dHSEeJGRR