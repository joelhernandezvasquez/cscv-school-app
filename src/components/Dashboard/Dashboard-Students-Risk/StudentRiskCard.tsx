import Avatar from '@/components/ui/avatar/Avatar';
import style from './style.module.css';
import Link from 'next/link';
import button from '../../../styles/buttons.module.css';

const StudentRiskCard = () => {
  return (
    <div className={style.student_risk_card}>
       
       <header className={style.student_risk_card_header}>
          <Avatar width={35} height={35}/>

            <div className={style.student_risk_item}>
              <p className={style.student_risk_item_name}>{'Joel Hernandez'}</p>
                <p className={style.student_risk_item_description}>{'No Courses Completed'}</p>
          </div>

       </header>
      
        <Link className={button.add_button} href={`/students/2`}>View Student</Link>
    </div>
  )
}

export default StudentRiskCard