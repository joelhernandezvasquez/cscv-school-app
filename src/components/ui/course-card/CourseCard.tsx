
import CourseLevelIcon from '../course-icon/CourseLevelIcon';
import { getFormattedDate } from '@/lib/utils';
import CourseLevelPill from '../course-level-pill/CourseLevelPill';
import { CompletedCourse } from '@/types';
import style from './style.module.css';
import util from '../../../styles/utils.module.css';

interface Props{
  completedCourse:CompletedCourse
}
const CourseCard = ({completedCourse}:Props) => {
  const {name,level,description,completeAt} = completedCourse;

  return (
    <li className={`${style.course_card} ${util.card_container}`}>
        <CourseLevelIcon level={level} width={50} height={50}/>
        <h3 className={style.course_card_title}>{name}</h3>
        <p>{description}</p>
        
        <div className={style.course_card_footer}>
         {completeAt && (
          <p className={style.course_card_date}> 
           <span>Date Completed</span>
           <span> {getFormattedDate(completeAt)}</span>
          </p>  
        )}
         <CourseLevelPill level={level}/>
        </div>   
    </li>
  )
}

export default CourseCard