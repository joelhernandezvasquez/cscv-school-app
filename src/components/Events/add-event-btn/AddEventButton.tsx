'use client';

import UseToggle from '@/hooks/UseToggle';
import Modal from '@/components/ui/modal/Modal';
import AddEventForm from '../addEventForm/AddEventForm';
import style from './style.module.css';

const AddEventButton = () => {
    const {isToggle,handleToggle} = UseToggle();
  return (
    <>
       <button className={style.add_event_btn} onClick={handleToggle}>Add Event</button>
     
    {isToggle && 
       <Modal 
        modalHeading='Add New Event' 
        onCloseModal={handleToggle}
        subText='Complete the information to create an event.'>
        {<AddEventForm onClose={handleToggle}/>}
      </Modal>
      }

    </>
    
  )
}

export default AddEventButton