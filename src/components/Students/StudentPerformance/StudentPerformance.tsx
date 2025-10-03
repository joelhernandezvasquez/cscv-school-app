import ProgressBar from "@/components/ui/progress-bar/ProgressBar"
import CourseCategoryPercentange from "@/components/ui/course-category-percentage/CourseCategoryPercentange";
import EmptyStudentPerformance from "./EmptyStudentPerformance";
import { getStudentProgress } from "@/lib/actions/students";
import { getCoursePercentange } from "@/lib/utils";
import { colorLevels } from "@/lib/constants";
import style from './style.module.css';
interface Props{
  studentId:string
}

const StudentPerformance = async({studentId}:Props) => {
const {totalCourses,totalCoursesTaken,coursesTakenByLevel} = await getStudentProgress(studentId);
const coursePercentage = getCoursePercentange(totalCoursesTaken,totalCourses);

  return (
    <div className={style.student_performance}>
         <h2 className="title">Performance</h2>
         {
          totalCourses > 0 ? (
          <>
            <div className={style.progress_bar_container}>
              <ProgressBar value={+coursePercentage} max={100} theme={'#5655D7'}/>
            </div>    
            <ul className={style.courses_progress_level}>
              {coursesTakenByLevel.map((element,index)=>{
                return <li key={colorLevels[index].id}>
                  <CourseCategoryPercentange 
                    colorLevel={colorLevels[index].color} 
                    level={element.level} 
                    courseLevelQuantity={element.courseLevelQuantity} 
                    courseQuantityCompleted={element.coursesCompleted}                  
                  />
                </li>
              })}
            </ul>
          </>
          ) :
          <EmptyStudentPerformance/>
        }
        </div>
  )}

export default StudentPerformance