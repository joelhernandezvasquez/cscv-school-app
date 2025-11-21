'use client';

import { ReactNode } from 'react';
import { EventFormProvider } from '../context/EventFormContext';
import UseToggle from '@/hooks/UseToggle';
import Modal from '@/components/ui/modal/Modal';
import AddEventForm from '../addEventForm/AddEventForm';
import style from './style.module.css';
interface Props{
 children:ReactNode
}

const AddEventButton = ({children}:Props) => {
    const {isToggle,handleToggle} = UseToggle();
  return (
    <>
       <button type='button' className={style.add_event_btn} onClick={handleToggle}>Add Event</button>
     
    {isToggle && 
       <Modal 
        modalHeading='Add New Event' 
        onCloseModal={handleToggle}
        subText='Complete the information to create an event.'>
        {

           <EventFormProvider>
               <AddEventForm onClose={handleToggle}>
                {children}
              </AddEventForm>
           </EventFormProvider>
       
        }
      </Modal>
      }

    </>
    
  )
}

export default AddEventButton