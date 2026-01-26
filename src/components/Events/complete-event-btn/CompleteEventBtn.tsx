'use client'
import { ReactNode } from 'react';
import UseToggle from '@/hooks/UseToggle';
import DeleteModal from '@/components/ui/modal/delete-modal/DeleteModal';
import { AiOutlineFileDone } from 'react-icons/ai';
import style from '../../../styles/buttons.module.css';

interface Props{
  children?:ReactNode
}

const CompleteEventButton = ({children}:Props) => {
 const {isToggle,handleToggle} = UseToggle();

  return (
    <>
    <button className={style.outline_button} onClick={handleToggle}>
      <AiOutlineFileDone size={20} />
       Complete event
    </button>

     {isToggle && 
       <DeleteModal
        heading='Complete Event' 
        subText='Are you sure you want to close this Event?'
        >
        {children}
      </DeleteModal>
      }
      </>
  )
}

export default CompleteEventButton