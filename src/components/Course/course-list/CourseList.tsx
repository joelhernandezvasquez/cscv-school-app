import { fetchCourses } from "@/lib/actions/courses"
import CourseCardDetail from "../course-card-detail/CourseCardDetail";

const CourseList = async() => {
  const courses = await fetchCourses();

  return (
    <ul className="mt-6 grid gap-5">
     {
        courses.map((course)=>{
            return <CourseCardDetail key={course.id} course={course}/>
        })
     } 
    </ul>
  )
}

export default CourseList