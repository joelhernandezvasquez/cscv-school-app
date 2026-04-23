import { Suspense } from "react";
import { Metadata } from "next";
import GridStatSkeleton from "@/components/ui/grid-stat-skeleton/GridStatSkeleton";
import CourseCategory from "@/components/Course/course-category/CourseCategory";
import util from '../../../styles/utils.module.css';

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
     
    </main>
  )
}

export default CoursePage