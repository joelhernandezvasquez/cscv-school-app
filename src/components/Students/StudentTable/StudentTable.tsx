import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Avatar from "@/components/ui/avatar/Avatar";
import { FaBookBible } from "react-icons/fa6";
import Badge from "@/components/ui/badge/Badge";
import util from '../../../styles/utils.module.css';
import ActionButton from "@/components/ui/action-button/ActionButton";
import { Students } from "@/types";
import { getFormattedDate } from "@/lib/utils";
import style from './style.module.css';
import StudentActionMenu from "../Student-Action-Menu/StudentActionMenu";
interface Props{
  studentsList:Students[]
}

const StudentTable = ({studentsList}:Props) => {
  return (
   <Table className={style.student_table}>
    <TableHeader className={style.student_table_header}>
      <TableRow>
        <TableHead className={style.table_text}>Name</TableHead>
        <TableHead className={style.table_text}>Enrollment Date </TableHead>
        <TableHead className={style.table_text}>Total Courses</TableHead>
        <TableHead className={style.table_text}>Phone Number</TableHead>
        <TableHead className={style.table_text}>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
  </TableHeader>

  <TableBody>
    {studentsList.map((student)=>{
      return (
      <TableRow key={student.id} className={style.table_row}>
        <TableCell className={`${style.student_row} ${style.student_name_container}`}>
          <Avatar width={35} height={35}/>
          <div className={style.student_name}>
            <span>{student.first_name} {student.last_name}</span>
            <span className={style.student_email}>{student.email}</span>
          </div>
        </TableCell>
     
        <TableCell className={util.text_left}>
        <p>{getFormattedDate(student.created_at)}</p>
        </TableCell>

        <TableCell className={`${style.student_courses}`}>
          <FaBookBible size={18} color="#5655D7" />
          <p>{student._count.Enrollments}</p>
        </TableCell>

        <TableCell>
          <p>{student.phone}</p>
        </TableCell>

        <TableCell className={`${style.status_action}`}>
          <Badge status= {student.active ? 'Active' : 'Inactive'}/>
        </TableCell>

        <TableCell className={style.student_action}>
            <ActionButton> {<StudentActionMenu studentId={student.id}/>} </ActionButton>
        </TableCell>
    
    </TableRow> 
      )
    })}
  </TableBody>

</Table>
  )
}

export default StudentTable