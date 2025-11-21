'use client';
import { useContext, useState } from 'react';
import { EventFormContext } from '../context/EventFormContext';
import UseToggle from '@/hooks/UseToggle';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import UseClickAway from '@/hooks/UseClickAway';
import style from './style.module.css';

interface Props{
  itemList:string[]
}

const EventCourseDropdown = ({itemList}:Props) => {
     const context = useContext(EventFormContext);
     const {isToggle,handleToggle} = UseToggle();
     const dropdownRef = UseClickAway(handleToggle);
     const [selectedCourse,setSelectedCourse] = useState('not selected');
     const { setCourse } = context;

     const onClose = (item:string) =>{
      setSelectedCourse(item);
      setCourse(item);
      handleToggle();
     }

  return (
    <div className={style.dropdown_container}>
        <button className={style.button} onClick={handleToggle} type='button'>
          <span>{selectedCourse}</span>

          <svg  width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.19064 5.37814C3.3615 5.20729 3.6385 5.20729 3.80936 5.37814L7 8.56878L10.1906 5.37814C10.3615 5.20729 10.6385 5.20729 10.8094 5.37814C10.9802 5.549 10.9802 5.826 10.8094 5.99686L7.30936 9.49686C7.1385 9.66771 6.8615 9.66771 6.69064 9.49686L3.19064 5.99686C3.01979 5.826 3.01979 5.549 3.19064 5.37814Z" fill="#2E3135"/>
          </svg> 
       </button>

       {isToggle &&
        <div ref={dropdownRef}>
          <Dropdown 
            className={style.dropdown_style} 
            items={itemList}
            onClose={onClose}
          />
        </div>  
     }
    </div>
  )
}

export default EventCourseDropdown