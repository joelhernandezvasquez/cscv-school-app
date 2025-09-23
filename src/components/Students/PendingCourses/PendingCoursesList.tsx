import Image from 'next/image';
import { getPendingCoursesList } from '@/lib/actions/students';
import {getPendingCoursesFormatted} from '@/lib/utils';
import style from './style.module.css';
import util from '../../../styles/utils.module.css';
interface Props{
   studentId:string
}

const PendingCoursesList = async ({studentId}:Props) => {
  const pendingCourses = await getPendingCoursesList(studentId);
  const pendingCoursesFormatted = getPendingCoursesFormatted(pendingCourses);
  
   return (
    <section className={`${style.pending_course_container} ${util.card_container}`}>
       <h2 className='title'>Pending Courses</h2>
       <div className={style.inner_course_container}>
       
       <ul className={style.course_list}>
        {pendingCoursesFormatted.map((course)=>{
         return <li key={course.name} className={style.course_item}>
                  <div className={`${style.course_item_icon} ${style[course.level]}`}>
                     <Image
                     width={24}
                     height={24}
                     alt=""
                     src={`/assets/${course.level}.svg`}
                     />
                  </div>

                  <div className={style.course_item_info}>
                     <p className={style.course_item_info_name}>{course.name}</p>
                     <p className={style.course_item_info_description}>{course.description}</p>
                  </div>

                  <div className={`${style.course_item_level} ${style[course.level]}`}>
                     <span>{course.nivel}</span>
                  </div>

               </li>
        })}
       </ul>
       </div>
    </section>
  )
}

export default PendingCoursesList