'use client';
import {useState} from 'react';
import {usePathname, useRouter } from 'next/navigation';
import Modal from '@/components/ui/modal/Modal';
import UpdateStudentForm from '../UpdateStudentForm/UpdateStudentForm';
import DeleteModal from '@/components/ui/modal/delete-modal/DeleteModal';
import DeleteStudentForm from '../DeleteStudentForm/DeleteStudentForm';
import { Students } from '@/types';
import style from './style.module.css';

enum StudentActions {
  View = 'view',
  Update = 'update',
  Delete = 'delete'
}

interface Props{
student:Students
}

const StudentActionMenu = ({student}:Props) => {
  const {id} = student;
 const pathName = usePathname();
 const router = useRouter();
 const [modalState,setModalState] = useState<StudentActions | null>(null);

  const handleStudentAction = (action:StudentActions) =>{
    if(action === StudentActions.View){
      router.push(`${pathName}/${id}`);
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
        onCloseModal={()=>window.location.reload()}
        >
        {<UpdateStudentForm student={student}/>}
      </Modal>
       )}

       {modalState === StudentActions.Delete && (
          <DeleteModal 
          heading={`Delete`} 
          subText='Are you sure you want to delete this student?'
          >
          {<DeleteStudentForm studentId={id}/>}
        </DeleteModal>
       )}
    </div>
  )
}

export default StudentActionMenu