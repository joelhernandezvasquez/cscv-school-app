import { getCompletedCoursesList } from '@/lib/actions/students';
import CourseCard from '@/components/ui/course-card/CourseCard';
import { getCoursesFormatted } from '@/lib/utils';
import { CompletedCourse } from '@/types';
import style from './style.module.css';

interface Props{
    studentId:string
}

const CompleteCourses = async({studentId}:Props) => {
   const completedCourseList = await getCompletedCoursesList(studentId);
   const completeCoursesFormatted = getCoursesFormatted(completedCourseList);
 
  return (
    <section>
       <h2 className='title'> Courses Completed</h2>
       <ul className={style.courses_completed_list}>
          {completeCoursesFormatted.map((course)=>{
           return <CourseCard key={course.name} completedCourse={course as CompletedCourse}/>
          })} 
       </ul>
    </section>
  )
}

export default CompleteCourses