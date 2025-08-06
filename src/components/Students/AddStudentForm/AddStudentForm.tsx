'use client';
import { useActionState } from 'react';
import { addStudent } from '@/lib/actions/students';
import ErrorMessage from '@/components/ui/error/ErrorMessage';
import style from './style.module.css';
import form from '../../../styles/forms.module.css';
import button from '../../../styles/buttons.module.css';

interface Props{
  onClose:() => void
}

// interface AddStudentFormState {
//   errors?: {
//     firstName?: boolean;
//     lastName?: boolean;
//     email?: boolean,
//     phoneNumber?: boolean;
//     gender?: boolean;
//     street?: boolean;
//     city?: boolean;
//     state?: boolean;
//     zipcode?: boolean;
//     parroquia?: boolean;
//     medicalCondition?: boolean
//   };
// }

const AddStudentForm = ({onClose}:Props) => {
 const [data,action,isPending] = useActionState(addStudent, undefined);
  return (
    <form className={style.form} action={action}>
       <div className={form.form_field}>
          <label htmlFor='firstName'>First Name</label>
          <input className={`${data?.firstName && form.error}`} type='text' name='firstName' id='firstName'/>
          {data?.firstName && <ErrorMessage message='First Name is required.'/>}
       </div>

       <div className={form.form_field}>
          <label htmlFor='lastName'>Last Name</label>
          <input className={`${data?.lastName && form.error}`} type='text' name='lastName' id='lastName'/>
           {data?.lastName && <ErrorMessage message='Last Name is required.'/> }
       </div>

        <div className={form.form_field}>
          <label htmlFor='email'>Email</label>
          <input className={`${data?.email && form.error}`} type='email' name='email' id='email'/>
           {data?.email && <ErrorMessage message='Email is required.'/>}
       </div>

         <div className={form.form_field}>
          <label htmlFor='phoneNumber'>Phone Number</label>
          <input className={`${data?.phoneNumber && form.error}`} type='text' name='phoneNumber' id='phoneNumber'/>
          {data?.phoneNumber && <ErrorMessage message='Phone Number is required.'/>}
       </div>

         <div className={form.form_field}>
          <label htmlFor='gender'>Gender</label>
          <div className={form.radio_group}>
            <label>
                 <input type="radio" name='genderRadio' value={'M'}/>
                 Male
            </label>
         
            <label>
                 <input type="radio" name='genderRadio' value={'F'}/>
                 Female
            </label>
             
          </div>
          {data?.gender && <ErrorMessage message='Gender is required.'/>}
       </div>

       <fieldset className={form.fieldset}>
           <div className={form.form_field}>
              <label htmlFor='street'>Street</label>
              <input className={`${data?.street && form.error}`} type='text' name='street' id='street'/>
               {data?.street && <ErrorMessage message='Address is required.'/>}
           </div>

           <div className={form.form_field}>
              <label htmlFor='city'>City</label>
              <input className={`${data?.city && form.error}`} type='text' name='city' id='city'/>
               {data?.city && <ErrorMessage message='City is required.'/>}
          </div>

           <div className={form.form_field}>
              <label htmlFor='state'>State</label>
              <input className={`${data?.state && form.error}`} type='text' name='state' id='state'/>
               {data?.state && <ErrorMessage message='Please provide a state.'/>}
          </div>

            <div className={form.form_field}>
              <label htmlFor='zipcode'>Zip Code</label>
              <input className={`${data?.zipcode && form.error}`} type='number' name='zipcode' id='zipcode'/>
               {data?.zipcode && <ErrorMessage message='Zip code is missing.'/>}
          </div>
           
       </fieldset>

        <div className={form.form_field}>
          <label htmlFor='parroquia'>Parroquia</label>
          <input className={`${data?.parroquia && form.error}`} type='text' name='parroquia' id='parroquia'/>
           {data?.parroquia && <ErrorMessage message='Please this field is required.'/>}
       </div>

         <div className={form.form_field}>
          <label htmlFor='medicalCondition'>Medical Condition</label>
          <textarea className={form.textarea} name='medicalCondition' id='medicalCondition'/>
       </div>

     <div className={style.buttons_container}>
      <button className={`${button.primary_btn} ${button.cancel_btn}`} onClick={()=> onClose()}>Cancel</button>
      <button 
        className={`${button.primary_btn} ${button.submit_btn}`}
        disabled={isPending}
        >
        {isPending ? 'Submiting...' : 'Add' }
      </button>
     </div>
    </form>
  )
}

export default AddStudentForm