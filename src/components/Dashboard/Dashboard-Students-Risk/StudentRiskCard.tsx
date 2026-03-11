import Avatar from '@/components/ui/avatar/Avatar';
import style from './style.module.css';
import Link from 'next/link';
import button from '../../../styles/buttons.module.css';
import { StudentNoCourse } from '@/types';

interface Props{
  studentsNoCourse:StudentNoCourse,
  studentStatus:string
}

const StudentRiskCard = ({studentsNoCourse,studentStatus}:Props) => {
  const {first_name,last_name,id} = studentsNoCourse;

  return (
    <div className={style.student_risk_card}>
       
       <header className={style.student_risk_card_header}>
          <Avatar width={35} height={35}/>

            <div className={style.student_risk_item}>
              <p className={style.student_risk_item_name}>{`${first_name} ${last_name}`}</p>
              <p className={style.student_risk_item_description}>{studentStatus}</p>
          </div>

       </header>
      
        <Link className={button.add_button} href={`/students/${id}`}>View Student</Link>
    </div>
  )
}

export default StudentRiskCard