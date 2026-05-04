import { Suspense } from "react";
import { Metadata } from "next";
import GridStatSkeleton from "@/components/ui/grid-stat-skeleton/GridStatSkeleton";
import CourseCategory from "@/components/Course/course-category/CourseCategory";
import FilterCourseTabs from "@/components/Course/filter-course-tabs/FilterCourseTabs";
import AddCourseButton from "@/components/Course/add-course-button/AddCourseButton";
import util from '../../../styles/utils.module.css';
import TableSkeleton from "@/components/ui/table-skeleton/TableSkeleton";
import CourseList from "@/components/Course/course-list/CourseList";

export const metadata: Metadata = {
  title: "Courses",
  description: "CSCV Academy",
};

export default async function CoursePage(props:{
   searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?:string
  }>;
}) {

   const searchParams = await(props.searchParams);
   const query = searchParams?.query || '';

  return (
    <main className={util.wrapper}>
       <Suspense fallback={<GridStatSkeleton/>}>
        <CourseCategory/>
     </Suspense>

     <section className="container-card mt-5"> 
       <header className="flex items-center justify-between p-4">
         <FilterCourseTabs/>
         <AddCourseButton/>
       </header>
     </section>

     <Suspense key={query} fallback={<TableSkeleton/>}>
       <CourseList query={query}/>
     </Suspense>
     
    </main>
  )
}

