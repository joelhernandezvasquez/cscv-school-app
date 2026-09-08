import {searchCourses } from "@/lib/actions/courses"
import CourseCardDetail from "../course-card-detail/CourseCardDetail";

interface Props{
  query:string
}

const CourseList = async({query}:Props) => {
  const courses = await searchCourses(query);
 
  return (
    <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
     {
        courses.map((course)=>{
            return <CourseCardDetail key={course.id} course={course}/>
        })
     } 
    </ul>
  )
}

export default CourseList