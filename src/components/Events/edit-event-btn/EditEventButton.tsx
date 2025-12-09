'use client'
import { ReactNode } from 'react';
import UseToggle from '@/hooks/UseToggle';
import Modal from '@/components/ui/modal/Modal';
import { VscEdit } from 'react-icons/vsc';
import style from '../../../styles/buttons.module.css';

interface Props{
  children:ReactNode
}

const EditEventButton = ({children}:Props) => {
 const {isToggle,handleToggle} = UseToggle();

  return (
    <>
    <button className={style.outline_button} onClick={handleToggle}>
      <VscEdit size={18} />
       Edit event
    </button>

     {isToggle && 
       <Modal 
        modalHeading='Update Event' 
        onCloseModal={handleToggle}
        >
        {children}
      </Modal>
      }
      </>
  )
}

export default EditEventButton