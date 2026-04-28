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

const CoursePage = () => {
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

     <Suspense fallback={<TableSkeleton/>}>
       <CourseList/>
     </Suspense>
     
    </main>
  )
}

export default CoursePage