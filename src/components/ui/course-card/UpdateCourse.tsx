'use client';
import UpdateStudentCourseForm from '@/components/Students/UpdateStudentCourseForm/UpdateStudentCourseForm';
import Modal from '../modal/Modal';
import { CompletedCourse } from '@/types';
import UseToggle from '@/hooks/UseToggle';
import buttons from '../../../styles/buttons.module.css';


interface Props{
  studentId:string
  completedCourse:CompletedCourse
}
const UpdateCourse = ({studentId,completedCourse}:Props) => {

  const {isToggle,handleToggle} = UseToggle();
  return (
    <>
       <button 
         className={`${buttons.add_button} mt-auto`}
         onClick={handleToggle}
         >
           Update Date
       </button>
    
    {
      isToggle &&
      (
        <Modal
         modalHeading='Update Student Course'
         onCloseModal={handleToggle} 
        >
         {<UpdateStudentCourseForm studentId={studentId} completedCourse={completedCourse}/>}
        </Modal>
      )
    }
    </>
    
  )
}

export default UpdateCourse