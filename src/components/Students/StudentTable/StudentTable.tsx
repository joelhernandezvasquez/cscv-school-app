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
import style from './style.module.css';
import util from '../../../styles/utils.module.css';
import ActionButton from "@/components/ui/action-button/ActionButton";

const StudentTable = () => {
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
          
    <TableRow className={style.table_row}>
     <TableCell className={`${style.student_row} ${style.student_name_container}`}>
       <Avatar width={35} height={35}/>
       <div className={style.student_name}>
         <span>Joel Hernandez</span>
         <span className={style.student_email}>joel.h@email.com</span>
       </div>
    </TableCell>
     
    <TableCell className={util.text_left}>
     <p>Feb 5, 2024</p>
    </TableCell>

     <TableCell className={`${style.student_courses}`}>
      <FaBookBible size={18} color="#5655D7" />
      <p>10</p>
    </TableCell>

    <TableCell>
       <p>(646)-841-6837</p>
    </TableCell>

    <TableCell className={`${style.status_action}`}>
      <Badge status="Active"/>
    </TableCell>

    <TableCell className={style.student_action}>
        <ActionButton/>
     
   
    </TableCell>
    
    </TableRow>

    <TableRow className={style.table_row}>
     <TableCell className={`${style.student_row} ${style.student_name_container}`}>
       <Avatar width={35} height={35}/>
       <div className={style.student_name}>
         <span>Joel Hernandez</span>
         <span className={style.student_email}>joel.h@email.com</span>
       </div>
    </TableCell>
     
    <TableCell className={util.text_left}>
     <p>Feb 5, 2024</p>
    </TableCell>

     <TableCell className={`${style.student_courses}`}>
      <FaBookBible size={18} color="#5655D7" />
      <p>10</p>
    </TableCell>

    <TableCell>
       <p>(646)-841-6837</p>
    </TableCell>

    <TableCell className={`${style.status_action}`}>
      <Badge status="Active"/>
    </TableCell>

    <TableCell className={style.student_action}>
      <ActionButton/>
   
    </TableCell>
    
    </TableRow>

    <TableRow className={style.table_row}>
     <TableCell className={`${style.student_row} ${style.student_name_container}`}>
       <Avatar width={35} height={35}/>
       <div className={style.student_name}>
         <span>Joel Hernandez</span>
         <span className={style.student_email}>joel.h@email.com</span>
       </div>
    </TableCell>
     
    <TableCell className={util.text_left}>
     <p>Feb 5, 2024</p>
    </TableCell>

     <TableCell className={`${style.student_courses}`}>
      <FaBookBible size={18} color="#5655D7" />
      <p>10</p>
    </TableCell>

    <TableCell>
       <p>(646)-841-6837</p>
    </TableCell>

    <TableCell className={`${style.status_action}`}>
      <Badge status="Active"/>
    </TableCell>

    <TableCell className={style.student_action}>
     <ActionButton/>
   
    </TableCell>
    
    </TableRow>
  </TableBody>

</Table>
  )
}

export default StudentTable