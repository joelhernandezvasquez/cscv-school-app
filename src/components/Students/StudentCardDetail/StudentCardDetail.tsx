import Image from 'next/image';
import Badge from '@/components/ui/badge/Badge';
import StudentContactList from './StudentContactList';
import { Students } from '@/types';
import { getFormattedDate } from '@/lib/utils';
import style from './style.module.css';

interface Props{
   student:Students
}
const StudentCardDetail = ({student}:Props) => {
   const {id,first_name,last_name,active,gender,created_at,email,phone,direccion,parroquia,asuntos_medicos} = student;
   const enrollDate = getFormattedDate(created_at);
  
   return (
    <div className={style.student_card_detail}>
       <header className={style.student_card_detail_header}>
        <div className={style.student_card_detail_header_avatar}>
         <Image
         className={style.student_image}
          width={50}
          height={50}
          alt={''}
          src={gender === 'M' ? '/assets/maleAvatar.png' : '/assets/femaleAvatar.png'}
         />
        </div>
       </header>

       <div className={style.student_card_detail_info}>
         <div className={style.student_card_detail_info_header}>
           <p className={style.student_id}>STU-{id}</p>
           <Badge status={active ? 'Active' :'Inactive'}/>
        </div>

         <h1>{first_name} {last_name}</h1>
         <p className={style.student_card_detail_info_enroll_date}>
          <span className={style.enroll_date_text}>Enrolled on</span>
          <span>{enrollDate}</span>
         </p>
       </div>

       <div className={style.student_card_detail_contact}>
          <h2>General Info</h2>
          <StudentContactList 
           email={email} 
           phone={phone} 
           direccion={direccion} 
           parroquia={parroquia} 
           asuntos_medicos={asuntos_medicos}           
          />
       </div>
    </div>
  )
}

export default StudentCardDetail