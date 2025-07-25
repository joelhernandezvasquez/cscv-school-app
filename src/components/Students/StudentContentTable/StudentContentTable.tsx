import { fetchStudents } from "@/lib/actions/students";
import StudentTable from "../StudentTable/StudentTable";
import StudentTableItem from "../StudentTableItem/StudentTableItem";
import style from './style.module.css';

interface Props{
   query:string,
    // sortBy?:string,
   currentPage:number | string,
}

const StudentContentTable = async({query,currentPage}:Props) => {
  console.log(query);
  console.log(currentPage); 
  const studentList = await fetchStudents(query,currentPage);

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