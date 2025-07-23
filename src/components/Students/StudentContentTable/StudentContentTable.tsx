import { fetchStudents } from "@/lib/actions/students";
import StudentTable from "../StudentTable/StudentTable";
import StudentTableItem from "../StudentTableItem/StudentTableItem";
import style from './style.module.css';

const StudentContentTable = async() => {
   const studentList = await fetchStudents();

  return (
   <>
   <ul className={style.student_items_container}>
    {
      studentList.map((student)=>{
        return <StudentTableItem key={student.id} student={student}/>
      })
    }
   </ul>

    <StudentTable studentsList={studentList}/>
   </>
  )
}

export default StudentContentTable