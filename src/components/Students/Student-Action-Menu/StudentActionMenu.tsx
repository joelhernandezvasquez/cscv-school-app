'use client';
import {useState} from 'react';
import {usePathname, useRouter } from 'next/navigation';
import Modal from '@/components/ui/modal/Modal';
import AddStudentForm from '../AddStudentForm/AddStudentForm';
import style from './style.module.css';

enum StudentActions {
  View = 'view',
  Update = 'update',
  Delete = 'delete'
}

interface Props{
  studentId:number
}

const StudentActionMenu = ({studentId}:Props) => {
 const pathName = usePathname();
 const router = useRouter();
 const [modalState,setModalState] = useState<StudentActions | null>(null);

  const handleStudentAction = (action:StudentActions) =>{
    if(action === StudentActions.View){
      router.push(`${pathName}/${studentId}`);
    }
    if(action === StudentActions.Update){
      setModalState(action);
    }
    if(action === StudentActions.Delete){
      setModalState(action);
    }
  } 
   
  return (
   <div className={style.action_menu}>
       <ul className={style.menu}>
          <li onClick={() => handleStudentAction(StudentActions.View)}>View Student</li>
          <li onClick={() => handleStudentAction(StudentActions.Update)}>Update Student</li>
          <li onClick={() => handleStudentAction(StudentActions.Delete)} className={style.delete_item}>Delete Student</li>
       </ul>

       {modalState === StudentActions.Update && (
        <Modal 
        modalHeading='Update Student' 
        onCloseModal={()=>{}}
        >
        {<AddStudentForm onClose={()=>{}}/>}
      </Modal>
       )}

       {modalState === StudentActions.Delete && (
        <Modal 
        modalHeading='Delete Student' 
        onCloseModal={()=>{}}
        >
        {<AddStudentForm onClose={()=>{}}/>}
      </Modal>
       )}
    </div>
  )
}

export default StudentActionMenu