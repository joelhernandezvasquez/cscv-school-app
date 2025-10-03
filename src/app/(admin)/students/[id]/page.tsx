import { Suspense } from "react";
import StudentCardDetail from "@/components/Students/StudentCardDetail/StudentCardDetail";
import StudentPerformance from "@/components/Students/StudentPerformance/StudentPerformance";
import PendingCoursesList from "@/components/Students/PendingCourses/PendingCoursesList";
import CompleteCourses from "@/components/Students/CompletedCourses/CompleteCourses";
import { fetchStudent } from "@/lib/actions/students";
import style from './style.module.css';
import util from '../../../../styles/utils.module.css';
interface StudentPageProps {
  params: { id: string }
}

const StudentPage = async ({params}:StudentPageProps) => {
  const {id} = params;
  const studentInfo = await fetchStudent(id);

  return (
    <div className={`${style.student_grid} ${util.wrapper}`}>
      <StudentCardDetail student={studentInfo}/>
      
      <Suspense fallback="Loading..">
         <StudentPerformance studentId = {id}/>
      </Suspense>

       {/* <Suspense fallback="Loading...">
          <PendingCoursesList studentId={id}/>
       </Suspense>

       <Suspense fallback="Loading...">
         <CompleteCourses studentId={id}/>
       </Suspense> */}
     
    </div>
  )
}

export default StudentPage