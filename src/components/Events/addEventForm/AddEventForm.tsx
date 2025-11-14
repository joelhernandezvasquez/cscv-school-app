import { ReactNode, FormEvent } from 'react';
import style from '../../../styles/forms.module.css';

interface Props{
  onClose?:() => void,
  children:ReactNode
}
const AddEventForm = ({children}:Props) => {

  const onSubmit = (event: FormEvent<HTMLFormElement>) =>{
    console.log('ssubmitting');
     event.preventDefault();
     event.stopPropagation();
  }
  return (
    <form className={style.form} onSubmit={(event) => onSubmit(event)}>
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
    </form>
  )
}

export default AddEventForm