
import CourseLevelIcon from '../course-icon/CourseLevelIcon';
import { getFormattedDate } from '@/lib/utils';
import CourseLevelPill from '../course-level-pill/CourseLevelPill';
import { CompletedCourse } from '@/types';
import style from './style.module.css';
import util from '../../../styles/utils.module.css';
import UpdateCourse from './UpdateCourse';

interface Props{
  studentId:string
  completedCourse:CompletedCourse
}
const CourseCard = ({studentId,completedCourse}:Props) => {
  const {name,level,description,completeAt} = completedCourse;

  return (
    <li className={`${style.course_card} ${util.card_container}`}>
        <div className='flex items-center justify-between'>
            <CourseLevelIcon level={level} width={50} height={50}/>
        </div>
      
        <h3 className={style.course_card_title}>{name}</h3>
        <p>{description}</p>
        
        <div className={`${style.course_card_footer} mb-2`}>
         {completeAt && (
          <p className={style.course_card_date}> 
           <span>Date Completed</span>
           <span> {getFormattedDate(completeAt)}</span>
          </p>  
        )}
         <CourseLevelPill level={level}/>
        </div>   
        
        <UpdateCourse studentId={studentId} completedCourse={completedCourse}/>
    </li>
  )
}

export default CourseCard