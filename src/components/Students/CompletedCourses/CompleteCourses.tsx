import { getCompletedCoursesList } from '@/lib/actions/students';
import CourseCard from '@/components/ui/course-card/CourseCard';
import { getCoursesFormatted } from '@/lib/utils';
import { CompletedCourse } from '@/types';
import style from './style.module.css';
import EmptyCourses from './EmptyCourses';

interface Props{
    studentId:string
}

const CompleteCourses = async({studentId}:Props) => {
   const completedCourseList = await getCompletedCoursesList(studentId);
   const completeCoursesFormatted = getCoursesFormatted(completedCourseList);
    
  return (
    <section className={style.course_container}>
       <h2 className='title'> Courses Completed</h2>
       {
         completedCourseList.length > 0 ?
          <ul className={style.courses_completed_list}>
          {completeCoursesFormatted.map((course)=>{
           return <CourseCard key={course.name} completedCourse={course as CompletedCourse}/>
          })} 
       </ul>
       :
         <EmptyCourses/>
       }
      
    </section>
  )
}

export default CompleteCourses