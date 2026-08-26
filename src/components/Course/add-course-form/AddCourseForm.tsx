'use client';
import { useState,useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { courseLevel } from '@/lib/constants';
import UseToggle from '@/hooks/UseToggle';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { Toaster,toast } from 'sonner';
import { AddCourseFormState } from '@/types';
import { addCourse } from '@/lib/actions/courses/addCourse';
import style from '../../../styles/forms.module.css';
import button from '../../../styles/buttons.module.css';
import ErrorMessage from '@/components/ui/error/ErrorMessage';

interface Props{
  onClose:() => void
}

 const AddCourseForm = ({onClose}:Props) => {
 const[level,setLevel] = useState(courseLevel[0]);
 const {isToggle,handleToggle} = UseToggle();
 const router = useRouter();

     const addCourseAction = async (prevState: AddCourseFormState, formData: FormData) => {
       const result = await addCourse(prevState, formData);
       if (result.success) {
         toast.success(result.message);
         setTimeout(() => {
           router.refresh();
           onClose();
         }, 1000);
       }
       return result;
     };

    const [data, action, isPending] = useActionState<AddCourseFormState, FormData>(
            addCourseAction,
            { success: false, message: '', errors: {} },
  );

  const getClose = (item:string) =>{
    setLevel(item);
    handleToggle();
  }

  return (
    <form className={style.form} action={action}>
       <div className={style.form_field}>
          <label htmlFor='name'>Course Name</label>
          <input type='text' name='name' id='name'/>
          {data?.errors?.name && <ErrorMessage message='Event Name is required.'/>}
       </div>

         <div className={style.form_field}>
          <label htmlFor='description'>Course Description</label>
          <input type='text' name='description' id='description'/>
          {data?.errors?.description && <ErrorMessage message='Description is required.'/>}
       </div>


          <div className={`${style.form_field} relative w-full mb-4 lg:w-80`}>
            <label htmlFor='level'>Select Level</label>

             <button className={'flex items-center justify-between gap-2 border-0 bg-[##FAFAFA] rounded-xl py-1.5 px-2.5  text-[#2E3135] font-medium cursor-pointer'} 
               onClick={handleToggle} type='button'>
                <span>{level}</span>
                  <svg  width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.19064 5.37814C3.3615 5.20729 3.6385 5.20729 3.80936 5.37814L7 8.56878L10.1906 5.37814C10.3615 5.20729 10.6385 5.20729 10.8094 5.37814C10.9802 5.549 10.9802 5.826 10.8094 5.99686L7.30936 9.49686C7.1385 9.66771 6.8615 9.66771 6.69064 9.49686L3.19064 5.99686C3.01979 5.826 3.01979 5.549 3.19064 5.37814Z" fill="#2E3135"/>
                  </svg> 
           </button>
           
              {isToggle && (
                  <Dropdown 
                    className={'absolute top-19.5 left-0 z-2 overflow-auto text-md'}
                    items={courseLevel}
                    onClose={getClose}
                />
              )}
             <input type="hidden" name="level" value={level} />
              {data?.errors?.level && <ErrorMessage message='Level is required.'/>}
          </div>

           <div className={`${style.buttons_container} pt-5 lg:pt-8`}>
              <button type='button' className={`${button.primary_btn} ${button.cancel_btn}`} onClick={() => onClose()}>Cancel</button>
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

export default AddCourseForm