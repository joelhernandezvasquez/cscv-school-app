import StudentCardDetail from "@/components/Students/StudentCardDetail/StudentCardDetail";
import StudentPerformance from "@/components/Students/StudentPerformance/StudentPerformance";
import { fetchStudent } from "@/lib/actions/students";
import style from './style.module.css';
import util from '../../../../styles/utils.module.css';

interface StudentPageProps {
  params: { id: string }
}

const StudentPage = async ({params}:StudentPageProps) => {
  const {id} = params;
  const studentInfo = await fetchStudent(id);
  console.log(studentInfo);

  return (
    <div className={`${style.student_grid} ${util.wrapper}`}>
      <StudentCardDetail student={studentInfo}/>
      <StudentPerformance/>
    </div>
  )
}

export default StudentPage