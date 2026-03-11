import { getDashboardStudentRisk } from '@/lib/actions/dashboard';
import StudentRiskCard from './StudentRiskCard';
import { getMonthDifference } from '@/lib/utils';
import style from './style.module.css';

const DashboardStudentsRisk = async() => {

  const students = await getDashboardStudentRisk();
 
  return (
    <section>
       <p className="sub_title">Students At Risk</p>
       <ul className={style.dashboard_students_risk}>
        
        {students.studentsNoCourse.map((student)=>{
          return <li key={student.id}>
                    <StudentRiskCard studentsNoCourse={student} studentStatus='No Courses Completed'/>
                 </li>
        })}

        {students.studentsPastEnrollment.map((student,index)=>{
          return <li key={student.id}>
                  <StudentRiskCard studentsNoCourse={student} studentStatus={`Last Enrolled ${getMonthDifference(student.Enrollments[index].enrolled_at)} months ago`}/>
               </li>
        })}
         
       </ul>
    </section>
  )
}

export default DashboardStudentsRisk