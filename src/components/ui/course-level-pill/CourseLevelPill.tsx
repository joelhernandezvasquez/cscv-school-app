import { formatLevelName } from '@/lib/utils';
import style from './style.module.css';

interface Props{
    level:string
}

const CourseLevelPill = ({level}:Props) => {
   const nivel = formatLevelName(level);
  

  return (
    <div className={`${style.course_item_level} ${style[level]}`}>
        <span>{nivel}</span>  
    </div>
  )
}

export default CourseLevelPill