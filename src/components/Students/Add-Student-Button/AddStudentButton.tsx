'use client';
import UseToggle from '@/hooks/UseToggle';
import Modal from '@/components/ui/modal/Modal';
import AddStudentForm from '../AddStudentForm/AddStudentForm';
import { FaUserPlus } from 'react-icons/fa';
import style from './style.module.css';

const AddStudentButton = () => {
  const {isToggle,handleToggle} = UseToggle();
  return (
    <>
        <button className={style.mobile_student_btn} onClick={handleToggle}>
           <FaUserPlus size={18} color='#2E3135'/>
        </button>

         <button className={style.desktop_student_btn} onClick={handleToggle}>
           Add Student
        </button>
     
     {isToggle && 
       <Modal 
        modalHeading='Add New Student' 
        onCloseModal={handleToggle}
        subText='Complete the information to register a new student.'>
        {<AddStudentForm onClose={handleToggle}/>}
      </Modal>
      }
    </>
  )
}

export default AddStudentButton