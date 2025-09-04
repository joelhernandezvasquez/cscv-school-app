import style from './style.module.css';

interface Props{
  colorLevel:string,
  level:string,
  courseLevelQuantity:number,
  courseQuantityCompleted:number
}

const CourseCategoryPercentange = ({colorLevel,level,courseLevelQuantity,courseQuantityCompleted}:Props) => {
    
   const coursePercentage = (courseQuantityCompleted / courseLevelQuantity * 100).toFixed(2);
  return (
    <div className={style.container}>
       <div className={style.category_block}>
          <div style={{backgroundColor:colorLevel}} className={style.color_category}></div>
          <p className={style.level_name}>{level}</p>
       </div>
       
       <div className={style.category_block}>
         <p className={style.level_quantity}>{courseLevelQuantity} Courses</p>
         <svg  width="2" height="18" viewBox="0 0 2 18" fill="none">
            <path d="M1 0V18" stroke="#E2E2E3"/>
         </svg>
         <p className={style.course_percentage}>{coursePercentage}%</p>
       </div>
    </div>
  )
}

export default CourseCategoryPercentange