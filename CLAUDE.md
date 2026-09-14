# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

CSCV Academy is a Next.js 16 (App Router) admin dashboard for managing students, courses, enrollments, and events for a school. It is a frontend-only client: all persistent data lives behind a separate backend API (`NEXT_PUBLIC_SERVER_URL`), consumed via server actions that call `fetch` directly — there is no local database or ORM in this repo.

## Commands

```bash
npm run dev      # start dev server with Turbopack
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint
```

There is no test suite configured in this repo.

## Environment

- `.env` / `.env.development.local` / `.env.production` hold `NEXT_PUBLIC_SERVER_URL` (backend API base URL, already includes `/api`) and `NEXT_PUBLIC_AUTH_SECRET`.
- The backend API is an external service this repo does not contain — all data-fetching code assumes it is reachable at `NEXT_PUBLIC_SERVER_URL`.

## Architecture

### Auth

- Auth.js (`next-auth` v5 beta) is configured in [src/auth.config.ts](src/auth.config.ts) using the `CredentialsProvider`. `authorize()` posts credentials to the backend `/auth/login` endpoint and returns the resulting user/token payload.
- Session strategy is JWT; the `jwt` and `session` callbacks stash the full backend response (`token.data = user`) and replace the session object with it wholesale on read — so `session` shape mirrors the backend's login response (`UserSession` in [src/types/index.ts](src/types/index.ts)), not the default Auth.js session shape.
- Route protection is done per-layout, not via middleware (no `middleware.ts` exists): [src/app/(admin)/layout.tsx](src/app/(admin)/layout.tsx) calls `auth()` and redirects to `/login` when there's no session. All admin pages live under the `(admin)` route group and inherit this guard.
- Token refresh: `getValidatedToken()` in [src/lib/actions/index.ts](src/lib/actions/index.ts) checks `session.expiresAt` against `Date.now()` and calls `refreshToken()` ([src/lib/actions/auth/login.ts](src/lib/actions/auth/login.ts)) when expired. Every server action that hits the backend calls `getValidatedToken()` first and sends the token as a `Bearer` header.

### Server actions / data layer

- All backend calls are Next.js server actions (`'use server'`) under `src/lib/actions/`, grouped by domain: `auth/`, `courses/`, `dashboard/`, `enrollments/`, `events/`, `students/`. Each domain has an `index.ts` with its `fetch`-based calls plus form-validation helpers (e.g. `validateStudentForm`).
- The pattern for every action: get a validated token, `fetch` the backend endpoint with an `Authorization: Bearer` header, `console.log` and rethrow on error. Follow this same pattern (token → fetch → typed return → try/catch with console.log + rethrow) when adding new actions rather than introducing a different error-handling style.
- Return types for actions are defined in [src/types/index.ts](src/types/index.ts) and must match the backend's JSON response shape — there's no runtime validation/schema layer, so keep types in sync manually when the backend changes.

### Domain data quirks

- Course levels are backend enum strings (e.g. `NIVEL_1_JESUS_ESTA_VIVO`, `RENACER_MUJERES`) that get transformed for the UI via string-replace helpers in [src/lib/utils.ts](src/lib/utils.ts): `formatCourseLevel` (enum → internal slug), `formatCourseLevelName` (enum → display name), `formatLevelToName`/`formatLevel` (reverse direction for forms). All three `RENACER_*` variants collapse to one "Renacer" display bucket — when adding a new course level, update all of these helpers together or the mapping will silently drift.
- Enrollment status is the `Enroll_Status` enum in [src/constants/index.ts](src/constants/index.ts): `registered | enrolled | noShow | cancelled | completed`.

### UI structure

- Routes live under `src/app/(admin)/...` (courses, dashboard, enrollment, events, students) plus a top-level `login` route and the NextAuth catch-all at `src/app/api/auth/[...nextAuth]/route.ts`.
- Components are organized by domain under `src/components/` (`Course/`, `Events/`, `Students/`, `Dashboard/`, etc.), with shared primitives (many shadcn/ui-derived) in `src/components/ui/`. shadcn config is in [components.json](components.json) — style `new-york`, base color `neutral`, icon library `lucide`, aliases `@/components`, `@/lib`, `@/ui`, `@/hooks`.
- Most non-`ui/` components pair a `.tsx` with a co-located `style.module.css` (CSS Modules), rather than pure Tailwind. `ui/` primitives tend to be Tailwind + `cva` (`class-variance-authority`) instead. Match whichever convention the surrounding folder already uses.
- Custom hooks live in `src/hooks/` (e.g. `UseToggle`, `UseClickAway`, `UseEventManagement`, `UseAddStudentCourse`).
