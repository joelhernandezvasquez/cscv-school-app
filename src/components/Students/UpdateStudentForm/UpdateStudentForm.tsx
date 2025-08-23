import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import ErrorMessage from '@/components/ui/error/ErrorMessage';
import { updateStudent } from '@/lib/actions/students/updateStudentForm';
import { AddStudentFormState, Students } from '@/types';
import style from './style.module.css';
import form from '../../../styles/forms.module.css';
import button from '../../../styles/buttons.module.css';
import { getFormattedAddress } from '@/lib/utils';

interface Props{
    student:Students
}
const UpdateStudentForm = ({student}:Props) => {
   const {first_name,last_name,email,phone,parroquia,asuntos_medicos,gender,direccion,active} = student;
    const [data, action, isPending] = useActionState<AddStudentFormState, FormData>(
     updateStudent,
     { success: false, message: '', errors: {} }
   );
   const router = useRouter();
   const {street,city,state,zipcode}= getFormattedAddress(direccion);

   useEffect(()=>{
    if(data?.success){
      toast.success(data?.message);
      setTimeout(()=>{
       router.refresh();
       window.location.reload();
      },1000)
     
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data?.success])

  return (
 <form className={style.form} action={action}>
       <div className={form.form_field}>
          <label htmlFor='firstName'>First Name</label>
          <input className={`${data?.errors?.firstName && form.error}`}  type='text' name='firstName' id='firstName' defaultValue={first_name}/>
           {data?.errors?.firstName && <ErrorMessage message='First Name is required.'/>} 
       </div>

       <div className={form.form_field}>
          <label htmlFor='lastName'>Last Name</label>
          <input className={`${data?.errors?.lastName && form.error}`}  type='text' name='lastName' id='lastName' defaultValue={last_name}/>
           {data?.errors?.lastName && <ErrorMessage message='Last Name is required.'/> }
       </div>

        <div className={form.form_field}>
          <label htmlFor='email'>Email</label>
          <input className={`${data?.errors?.email && form.error}`} type='email' name='email' id='email' defaultValue={email}/>
           {data?.errors?.email && <ErrorMessage message='Email is required.'/>}
       </div>

         <div className={form.form_field}>
          <label htmlFor='phoneNumber'>Phone Number</label>
          <input className={`${data?.errors?.phoneNumber && form.error}`} type='text' name='phoneNumber' id='phoneNumber' defaultValue={phone}/>
           {data?.errors?.phoneNumber && <ErrorMessage message='Phone Number is required.'/>}
       </div>

         <div className={form.form_field}>
          <label htmlFor='gender'>Gender</label>
          <div className={form.radio_group}>
            <label>
                 <input type="radio" name='genderRadio' value={'M'} defaultChecked={gender==='M'}/>
                 Male
            </label>
         
            <label>
                 <input type="radio" name='genderRadio' value={'F'} defaultChecked={gender==='F'}/>
                 Female
            </label>
             
          </div>
          {data?.errors?.gender && <ErrorMessage message='Gender is required.'/>} 
       </div>


       <div className={form.form_field}>
        <label className={style.form_checkbox}>
            <input
                type="checkbox"
                name="isActive"
                defaultChecked={active}
            />
            Active
        </label>
       </div>

       <fieldset className={form.fieldset}>
           <div className={form.form_field}>
              <label htmlFor='street'>Street</label>
              <input className={`${data?.errors?.street && form.error}`}  type='text' name='street' id='street' defaultValue={street}/>
               {data?.errors?.street && <ErrorMessage message='Address is required.'/>} 
           </div>

           <div className={form.form_field}>
              <label htmlFor='city'>City</label>
              <input className={`${data?.errors?.city && form.error}`} type='text' name='city' id='city' defaultValue={city}/>
               {data?.errors?.city && <ErrorMessage message='City is required.'/>} 
          </div>

           <div className={form.form_field}>
              <label htmlFor='state'>State</label>
              <input className={`${data?.errors?.state && form.error}`} type='text' name='state' id='state' defaultValue={state}/>
               {data?.errors?.state && <ErrorMessage message='Please provide a state.'/>}
          </div>

            <div className={form.form_field}>
              <label htmlFor='zipcode'>Zip Code</label>
              <input className={`${data?.errors?.zipcode && form.error}`} type='number' name='zipcode' id='zipcode' defaultValue={zipcode}/>
              {data?.errors?.zipcode && <ErrorMessage message='Zip code is missing.'/>} 
          </div>
           
       </fieldset>

        <div className={form.form_field}>
          <label htmlFor='parroquia'>Parroquia</label>
          <input className={`${data?.errors?.parroquia && form.error}`} type='text' name='parroquia' id='parroquia' defaultValue={parroquia}/>
           {data?.errors?.parroquia && <ErrorMessage message='Please this field is required.'/>}
       </div>

         <div className={form.form_field}>
          <label htmlFor='medicalCondition'>Medical Condition</label>
          <textarea className={form.textarea} name='medicalCondition' id='medicalCondition' defaultValue={asuntos_medicos}/>
       </div>

       <input type="hidden" name="id" value={student.id} />

     <div className={style.buttons_container}>
      <button className={`${button.primary_btn} ${button.cancel_btn}`} onClick={() => window.location.reload()}>Cancel</button>
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

export default UpdateStudentForm