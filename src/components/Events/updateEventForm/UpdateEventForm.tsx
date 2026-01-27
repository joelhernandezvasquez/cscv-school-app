'use client';
import {useState,useActionState} from 'react';
import { type DateRange } from "react-day-picker";
import { CalendarRange } from '../calendar-range/CalendarRange';
import useEventManagement from '@/hooks/UseEventManagement';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import {eventStatus} from '@/lib/constants';
import UseToggle from '@/hooks/UseToggle';
import { EventItem, UpdateEventFormState } from '@/types';
import ErrorMessage from '@/components/ui/error/ErrorMessage';;
import {Toaster} from 'sonner';
import style from './style.module.css';
import button from '../../../styles/buttons.module.css';
import form from '../../../styles/forms.module.css';

interface Props{
    event:EventItem,
}
 const UpdateEventForm = ({event}:Props) => {
     const {id,name,course_id,price,status,start_date,end_date,course} = event;
     const {isToggle,handleToggle} = UseToggle();
     const [eventState,setEventStatus] = useState(status);
     const [pickDate,setPickDate] = useState<DateRange>({from:start_date,to:end_date});
     const {customUpdateEvent} = useEventManagement();

     const [data, action, isPending] = useActionState<UpdateEventFormState, FormData>(
       customUpdateEvent,
       { success: false, message: '', errors: {} },
     );

  const onChangeDate = (dateRange:DateRange | undefined) =>{
    setPickDate(dateRange!);
  }

  const getClose = (item:string) =>{
    setEventStatus(item);
    handleToggle();
  }

  const refreshPage = () =>{
    window.location.reload();
  }
  return (
    <form className={form.form} action={action}>
       <div className={form.form_field}>
          <label htmlFor='name'>Event Name</label>
          <input type='text' name='name' id='name' defaultValue={name}/>
          <input type="hidden" name="id" value={id} />
          {data?.errors?.name && <ErrorMessage message='Event Name is required.'/>}
       </div>
         
        <div className={form.form_field}>
              <label htmlFor='course'>Course</label>
                <input type="text" name="courseName" defaultValue={course.name} disabled />
                <input type="hidden" name="course" value={course_id}/>
          </div>

         <div className={form.form_field}>
              <label htmlFor='price'>Price</label>
              <input type='number' name='price' id='price' defaultValue={price}/>
               {data?.errors?.price && <ErrorMessage message='Price is required.'/>}
          </div>

          <div className={`${form.form_field_two_column} ${style.dropdown_container}`}>
            <label htmlFor='status'>Select Status</label>

             <button className={style.button} onClick={handleToggle} type='button'>
                <span>{eventState}</span>
                  <svg  width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.19064 5.37814C3.3615 5.20729 3.6385 5.20729 3.80936 5.37814L7 8.56878L10.1906 5.37814C10.3615 5.20729 10.6385 5.20729 10.8094 5.37814C10.9802 5.549 10.9802 5.826 10.8094 5.99686L7.30936 9.49686C7.1385 9.66771 6.8615 9.66771 6.69064 9.49686L3.19064 5.99686C3.01979 5.826 3.01979 5.549 3.19064 5.37814Z" fill="#2E3135"/>
                  </svg> 
           </button>
              {isToggle && (
                  <Dropdown 
                    className={style.dropdown_style} 
                    items={eventStatus}
                    onClose={getClose}
                    />
              )}
             <input type="hidden" name="eventState"defaultValue={eventState} />
          </div>

          <div className={`${form.form_field}`}>
            <label htmlFor='date'>Select Date</label>
            {data?.errors?.eventDate && <ErrorMessage message='Date is required.'/>}
             <CalendarRange onChange={onChangeDate} rangeDates={pickDate}/>
            
             <input 
                type="hidden" 
                name="eventDate" 
                defaultValue={JSON.stringify({ from: pickDate?.from,to: pickDate?.to})}
              /> 
          </div>

           <div className={form.buttons_container}>
            <button type='button' className={`${button.primary_btn} ${button.cancel_btn}`} onClick={()=>refreshPage()}>Cancel</button>
            <button 
              className={`${button.primary_btn} ${button.submit_btn}`}
               disabled={isPending}
              >
              {isPending ? 'Submiting...' : 'Update' }
            </button>
     </div>
       <Toaster position="top-center" richColors  closeButton  />
    </form>
  )
}

export default UpdateEventForm