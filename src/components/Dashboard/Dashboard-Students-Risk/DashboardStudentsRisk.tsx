import StudentRiskCard from './StudentRiskCard';
import style from './style.module.css';

const DashboardStudentsRisk = () => {
  return (
    <section>
       <p className="sub_title">Students At Risk</p>
       <ul className={style.dashboard_students_risk}>
         <li>
            <StudentRiskCard/>
         </li>

          <li>
            <StudentRiskCard/>
         </li>

          <li>
            <StudentRiskCard/>
         </li>
       </ul>
    </section>
  )
}

export default DashboardStudentsRisk