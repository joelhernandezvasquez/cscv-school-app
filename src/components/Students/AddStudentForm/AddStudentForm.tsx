'use client';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addStudent } from '@/lib/actions/students/addStudentForm';
import { toast, Toaster } from 'sonner';
import ErrorMessage from '@/components/ui/error/ErrorMessage';
import { AddStudentFormState } from '@/types';
import style from './style.module.css';
import form from '../../../styles/forms.module.css';
import button from '../../../styles/buttons.module.css';
interface Props{
  onClose:() => void
}

const AddStudentForm = ({onClose}:Props) => {
 const [data, action, isPending] = useActionState<AddStudentFormState, FormData>(
  addStudent,
  { success: false, message: '', errors: {} }
);

 const router = useRouter();
 
  useEffect(()=>{
    if(data?.success){
      toast.success(data?.message);
      setTimeout(()=>{
       router.refresh();
        onClose();
      },1000)
     
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data?.success])

  return (
    <form className={style.form} action={action}>
       <div className={form.form_field}>
          <label htmlFor='firstName'>First Name</label>
          <input className={`${data?.errors?.firstName && form.error}`} type='text' name='firstName' id='firstName'/>
          {data?.errors?.firstName && <ErrorMessage message='First Name is required.'/>}
       </div>

       <div className={form.form_field}>
          <label htmlFor='lastName'>Last Name</label>
          <input className={`${data?.errors?.lastName && form.error}`} type='text' name='lastName' id='lastName'/>
           {data?.errors?.lastName && <ErrorMessage message='Last Name is required.'/> }
       </div>

        <div className={form.form_field}>
          <label htmlFor='email'>Email</label>
          <input className={`${data?.errors?.email && form.error}`} type='email' name='email' id='email'/>
           {data?.errors?.email && <ErrorMessage message='Email is required.'/>}
       </div>

         <div className={form.form_field}>
          <label htmlFor='phoneNumber'>Phone Number</label>
          <input className={`${data?.errors?.phoneNumber && form.error}`} type='text' name='phoneNumber' id='phoneNumber'/>
          {data?.errors?.phoneNumber && <ErrorMessage message='Phone Number is required.'/>}
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
          {data?.errors?.gender && <ErrorMessage message='Gender is required.'/>}
       </div>

       <fieldset className={form.fieldset}>
           <div className={form.form_field}>
              <label htmlFor='street'>Street</label>
              <input className={`${data?.errors?.street && form.error}`} type='text' name='street' id='street'/>
               {data?.errors?.street && <ErrorMessage message='Address is required.'/>}
           </div>

           <div className={form.form_field}>
              <label htmlFor='city'>City</label>
              <input className={`${data?.errors?.city && form.error}`} type='text' name='city' id='city'/>
               {data?.errors?.city && <ErrorMessage message='City is required.'/>}
          </div>

           <div className={form.form_field}>
              <label htmlFor='state'>State</label>
              <input className={`${data?.errors?.state && form.error}`} type='text' name='state' id='state'/>
               {data?.errors?.state && <ErrorMessage message='Please provide a state.'/>}
          </div>

            <div className={form.form_field}>
              <label htmlFor='zipcode'>Zip Code</label>
              <input className={`${data?.errors?.zipcode && form.error}`} type='number' name='zipcode' id='zipcode'/>
               {data?.errors?.zipcode && <ErrorMessage message='Zip code is missing.'/>}
          </div>
           
       </fieldset>

        <div className={form.form_field}>
          <label htmlFor='parroquia'>Parroquia</label>
          <input className={`${data?.errors?.parroquia && form.error}`} type='text' name='parroquia' id='parroquia'/>
           {data?.errors?.parroquia && <ErrorMessage message='Please this field is required.'/>}
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
    <Toaster position="top-center" richColors  closeButton  />
    </form>
  )
}

export default AddStudentForm