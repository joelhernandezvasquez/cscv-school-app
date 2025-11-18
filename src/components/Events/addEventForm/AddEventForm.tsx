import { ReactNode,useState } from 'react';
import style from '../../../styles/forms.module.css';
import { CalendarRange } from '../calendar-range/CalendarRange';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import {eventStatus} from '@/lib/constants';
import UseToggle from '@/hooks/UseToggle';
import form from './form.module.css';
import button from '../../../styles/buttons.module.css';

interface Props{
  onClose:() => void,
  children:ReactNode
}
const AddEventForm = ({children,onClose}:Props) => {
     const {isToggle,handleToggle} = UseToggle();
     const [eventState,setEventStatus] = useState(eventStatus[0]);

  // const onSubmit = () =>{
     
  // }
  const getClose = (item:string) =>{
    setEventStatus(item);
    handleToggle();
  }
  return (
    <form className={style.form}>
       <div className={style.form_field}>
          <label htmlFor='name'>Event Name</label>
          <input  type='text' name='name' id='name'/>
          {/* {data?.errors?.firstName && <ErrorMessage message='First Name is required.'/>} */}
       </div>

         <div className={style.form_field_two_column}>
              <label htmlFor='course'>Course</label>
               {children}
               {/* <EventCourseDropdown/> */}
               {/* {data?.errors?.zipcode && <ErrorMessage message='Zip code is missing.'/>} */}
          </div>

         <div className={style.form_field}>
              <label htmlFor='price'>Price</label>
              <input  type='number' name='price' id='price'/>
               {/* {data?.errors?.zipcode && <ErrorMessage message='Zip code is missing.'/>} */}
          </div>

          <div className={style.form_field}>
            <label htmlFor='date'>Select Date</label>
             <CalendarRange/>
          </div>

          <div className={`${style.form_field_two_column} ${form.dropdown_container}`}>
            <label htmlFor='status'>Select Status</label>

             <button className={form.button} onClick={handleToggle} type='button'>
                <span>{eventState}</span>
                  <svg  width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.19064 5.37814C3.3615 5.20729 3.6385 5.20729 3.80936 5.37814L7 8.56878L10.1906 5.37814C10.3615 5.20729 10.6385 5.20729 10.8094 5.37814C10.9802 5.549 10.9802 5.826 10.8094 5.99686L7.30936 9.49686C7.1385 9.66771 6.8615 9.66771 6.69064 9.49686L3.19064 5.99686C3.01979 5.826 3.01979 5.549 3.19064 5.37814Z" fill="#2E3135"/>
                  </svg> 
           </button>
              {isToggle && (
                  <Dropdown 
                    className={form.dropdown_style} 
                    items={eventStatus}
                    onClose={getClose}
                    />
              )}
             
          </div>

           <div className={style.buttons_container}>
            <button className={`${button.primary_btn} ${button.cancel_btn}`} onClick={() => onClose()}>Cancel</button>
            <button 
              className={`${button.primary_btn} ${button.submit_btn}`}
              // disabled={isPending}
              >
              {/* {isPending ? 'Submiting...' : 'Add' } */}
              Add
            </button>
     </div>

    </form>
  )
}

export default AddEventForm