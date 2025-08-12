import Avatar from '@/components/ui/avatar/Avatar';
import Badge from '@/components/ui/badge/Badge';
import ActionButton from '@/components/ui/action-button/ActionButton';
import { Students } from '@/types';
import {MdOutlinePhone } from 'react-icons/md';
import { CiCalendar } from 'react-icons/ci';
import { FaBookBible } from 'react-icons/fa6';
import { getFormattedDate } from '@/lib/utils';
import style from './style.module.css';
import StudentActionMenu from '../Student-Action-Menu/StudentActionMenu';
interface Props{
  student:Students
}

const StudentTableItem = ({student}:Props) => {

  const {first_name,last_name,phone,active,created_at} = student;
  const enrollmentDate = getFormattedDate(created_at);

  return (
    <li className={style.student_item}>
      <div className={style.student_left_col}>
        
        <div className={style.student_info}>
           <Avatar width={30} height={30}/>
           <div>
             <span>{first_name} {last_name}</span>
             <p className={style.student_info_text}> 
            <MdOutlinePhone size={20}/>
            {phone}
           </p>

           <p className={style.student_info_text}> 
            <CiCalendar size={20}/>  
           {enrollmentDate}
           </p>

           </div>
           
        </div>
      </div>

      <div className={style.student_right_col}>
        <ActionButton> {<StudentActionMenu studentId={student.id}/>} </ActionButton>
          <p className={style.student_info_text}> 
            <FaBookBible size={18} color="#5655D7" />
            {student._count.Enrollments}
           </p>
             <Badge status= {active ? 'Active' : 'Inactive'}/>
          
      </div>
    </li>
  )
}

export default StudentTableItem