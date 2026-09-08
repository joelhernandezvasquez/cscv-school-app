import { Suspense } from "react";
import { Metadata } from "next";
import CourseCategorySkeleton from "@/components/ui/course-category-skeleton/CourseCategorySkeleton";
import CourseCategory from "@/components/Course/course-category/CourseCategory";
import FilterCourseTabs from "@/components/Course/filter-course-tabs/FilterCourseTabs";
import AddCourseButton from "@/components/Course/add-course-button/AddCourseButton";
import util from '../../../styles/utils.module.css';
import CourseListSkeleton from "@/components/ui/course-list-skeleton/CourseListSkeleton";
import CourseList from "@/components/Course/course-list/CourseList";
import { auth } from "@/auth.config";
import { SessionUser } from '@/types';

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
   const session = await auth();

  return (
    <main className={util.wrapper}>
       <Suspense fallback={<CourseCategorySkeleton/>}>
        <CourseCategory/>
     </Suspense>

     <section className="container-card mt-5"> 
       <header className="flex items-center justify-between p-4">
         <FilterCourseTabs/>
           {(session?.user as SessionUser)?.role === 'super_admin' &&  <AddCourseButton/>}
       </header>
     </section>

     <Suspense key={query} fallback={<CourseListSkeleton/>}>
       <CourseList query={query}/>
     </Suspense>
     
    </main>
  )
}

