import Link from 'next/link';
import { auth } from '@/auth.config';
import { getPendingCoursesList } from '@/lib/actions/students';
import {getCoursesFormatted} from '@/lib/utils';
import CourseLevelIcon from '@/components/ui/course-icon/CourseLevelIcon';
import CourseLevelPill from '@/components/ui/course-level-pill/CourseLevelPill';
import { SessionUser } from '@/types';
import style from './style.module.css';
import util from '../../../styles/utils.module.css';
interface Props{
   studentId:string
}

const PendingCoursesList = async ({studentId}:Props) => {
  const pendingCourses = await getPendingCoursesList(studentId);
  const pendingCoursesFormatted = getCoursesFormatted(pendingCourses);
  const session = await auth();
  
   return (
    <section className={`${style.pending_course_container} ${util.card_container}`}>
       <header className={style.header}>
          <h2 className='title'>Pending Courses</h2>
          {(session?.user as SessionUser)?.role === 'admin' && <Link className={style.add_courses_btn} href={`/students/${studentId}/manual-course`}>Add Courses</Link>}
       </header>
      
       <div className={style.inner_course_container}>
       
       <ul className={style.course_list}>
        {pendingCoursesFormatted.map((course)=>{
         return <li key={course.name} className={style.course_item}>
                  <CourseLevelIcon level={course.level}/>

                  <div className={style.course_item_info}>
                     <p className={style.course_item_info_name}>{course.name}</p>
                     <p className={style.course_item_info_description}>{course.description}</p>
                  </div>
                  <CourseLevelPill level={course.level}/>

               </li>
        })}
       </ul>
       </div>
    </section>
  )
}

export default PendingCoursesList