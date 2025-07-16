import Avatar from '@/components/ui/avatar/Avatar';
import style from './style.module.css';
import {MdOutlinePhone } from 'react-icons/md';
import { CiCalendar } from 'react-icons/ci';
import { FaBookBible } from 'react-icons/fa6';
import Badge from '@/components/ui/badge/Badge';
import ActionButton from '@/components/ui/action-button/ActionButton';

const StudentTableItem = () => {
  return (
    <li className={style.student_item}>
      <div className={style.student_left_col}>
        
        <div className={style.student_info}>
           <Avatar width={30} height={30}/>
           <div>
             <span>Joel Hernandez</span>
             <p className={style.student_info_text}> 
            <MdOutlinePhone size={20}/>
            (646)-841-6837
           </p>

           <p className={style.student_info_text}> 
            <CiCalendar size={20}/>  
             Feb 5, 2024
           </p>

           </div>
           
        </div>
      </div>

      <div className={style.student_right_col}>
        <ActionButton/>
          <p className={style.student_info_text}> 
            <FaBookBible size={18} color="#5655D7" />
            10
           </p>

             <Badge status="Active"/>
          
      </div>
    </li>
  )
}

export default StudentTableItem