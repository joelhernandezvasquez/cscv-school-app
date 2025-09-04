import ProgressBar from "@/components/ui/progress-bar/ProgressBar"
import CourseCategoryPercentange from "@/components/ui/course-category-percentage/CourseCategoryPercentange";
import style from './style.module.css';

const StudentPerformance = () => {
  return (
    <div>
         <h2 className="title">Performance</h2>
          <div className={style.progress_bar_container}>
              <ProgressBar value={40} max={100} theme={'#5655D7'}/>
          </div>    
          
          <ul className={style.courses_progress_level}>
            <li>
                 <CourseCategoryPercentange 
                   colorLevel={"#a30f12"} 
                   level={"Nivel 1, Jesus Esta Vivo"} 
                   courseLevelQuantity={14} 
                   courseQuantityCompleted={6}                  
                 />
            </li>

              <li>
                 <CourseCategoryPercentange 
                   colorLevel={"#12a9a6"} 
                   level={"Nivel 2, Jesus Nos Capacita"} 
                   courseLevelQuantity={7} 
                   courseQuantityCompleted={1}                  
                 />
            </li>

              <li>
                 <CourseCategoryPercentange 
                   colorLevel={"#f5c544"} 
                   level={"Nivel 3, Jesus Nos Envia"} 
                   courseLevelQuantity={12} 
                   courseQuantityCompleted={2}                  
                 />
            </li>

             <li>
                 <CourseCategoryPercentange 
                   colorLevel={"#5655D7"} 
                   level={"Retiro Renaceres"} 
                   courseLevelQuantity={3} 
                   courseQuantityCompleted={3}                  
                 />
            </li>
          
          </ul>
    </div>
  )
}

export default StudentPerformance