import StudentTable from "../StudentTable/StudentTable";
import StudentTableItem from "../StudentTableItem/StudentTableItem";
import style from './style.module.css';

const StudentContentTable = () => {
  return (
   <>
   <ul className={style.student_items_container}>
     <StudentTableItem/>
      <StudentTableItem/>
       <StudentTableItem/>
   </ul>

    <StudentTable/>
   </>
  
  )
}

export default StudentContentTable