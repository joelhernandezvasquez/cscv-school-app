'use client';
import { ReactNode } from 'react';
import UseToggle from '@/hooks/UseToggle';
import Modal from '@/components/ui/modal/Modal';
import buttons from '../../../styles/buttons.module.css';

interface Props{
  course:string,
  date:string,
  children:ReactNode
}

const RegisterStudentBtn = ({course,date,children}:Props) => {
 
  const {isToggle,handleToggle} = UseToggle();

  return (
    <>
      <button className={buttons.add_button} onClick={handleToggle}>Register Student</button>
      
     {isToggle && (
      <Modal
       modalHeading={`Enroll Student`} 
       subText={`Enroll a student into: Curso ${course} ${date}`}
       onCloseModal={handleToggle}
      >
       {children}
      </Modal>
     )}
    </>
   
  )
}

export default RegisterStudentBtn