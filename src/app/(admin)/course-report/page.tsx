import { fetchCourses } from "@/lib/actions/courses";
import util from "../../../styles/utils.module.css";
import CourseParticipationDropdown from "@/components/Report/CourseParticipationDropdown/CourseParticipationDropdown";
import EmptyCourseParticipation from "@/components/Report/EmptyCourseParticipation/EmptyCourseParticipation";
import ReportMetrics from "@/components/Report/ReportMetrics/ReportMetrics";
import CourseCompletionTab from "@/components/Report/CourseCompletionTab/CourseCompletionTab";
import CourseSearchBar from "@/components/Report/CourseSearchBar/CourseSearchBar";
import CourseExportBtn from "@/components/Report/CourseExportBtn/CourseExportBtn";
import CourseParticipationPagination from "@/components/Report/CourseParticipationPagination/CourseParticipationPagination";
import CourseParticipationTable from "@/components/Report/CourseParticipationTable/CourseParticipationTable";
import { Suspense } from "react";
import TableSkeleton from "@/components/ui/table-skeleton/TableSkeleton";
import { getCompletionCourseList } from "@/lib/actions/reports";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    status?: string;
    search?: string;
  }>;
}) {
  const [searchParams, courses] = await Promise.all([
    props.searchParams,
    fetchCourses(),
  ]);

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const status = searchParams?.status === "completed" ? "completed" : "not-completed";
  const search = searchParams?.search?.trim() || "";
  const list =  await getCompletionCourseList(query);
  
  
  return (
    <main className={`${util.wrapper} bg-[#f7f8fa]`}>
      <header className="my-6">
        <h1 className="text-[#11141a] text-[1.5rem] lg:text-[2rem]">
          Course Participation
        </h1>
        <p className="text-[1rem] lg:text-[1.125rem]">
          Find every active student who has, or hasn&apos;t, completed a course or
          retreat.
        </p>
      </header>

      <CourseParticipationDropdown courses={courses} />
      {list.hasCompleted && query ? (
        <>
          <ReportMetrics
           hasCompleted={list.hasCompleted.length}
           hasNotCompleted={list.notCompleted.length}
          />

          <section className={`mt-4 ${util.card_container} md:mt-6`}>
            <header className="flex flex-col gap-3 md:flex-row md:items-center">
              <div>
                <CourseCompletionTab />
              </div>

              <div className="flex items-center gap-3 md:ml-auto md:flex-1">
                <CourseSearchBar key={`${query}:${search}`} initialValue={search} />
                <CourseExportBtn query={query} status={status} search={search} />
              </div>
            </header>

            <div className="mt-4">
               <Suspense key={query + currentPage + status + search} fallback={<TableSkeleton/>}>
                <CourseParticipationTable
                  query={query} 
                  currentPage={currentPage}
                  status={status}
                  search={search}
                />
               </Suspense>
            </div>

            <Suspense key={query + currentPage + status + search} fallback={null}>
              <CourseParticipationPagination
                query={query}
                status={status}
                currentPage={currentPage}
                search={search}
              />
            </Suspense>
          </section>
        </>
      ) : (
        <EmptyCourseParticipation />
      )}
    </main>
  );
}
