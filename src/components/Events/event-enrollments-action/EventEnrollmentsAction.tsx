'use client';

import { startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateEnrollment } from '@/lib/actions/enrollments';
import { toast, Toaster } from 'sonner';
import { Enroll_Status } from '@/constants';
import buttons from '../../../styles/buttons.module.css';


interface Props{
    enrollStatus:string,
    enrollmentId:string
}

const EventEnrollmentsAction = ({enrollStatus,enrollmentId}:Props) => {
   const router = useRouter();

  //TODO:This function needs to go to a custom hook that manages enrollment
  const onUpdateEnrollment = (status:string) =>{
     startTransition(async()=>{
       const {success,message }= await updateEnrollment(enrollmentId,status);
       
       if(success){
          toast.message(message);
          setTimeout(()=>{
           router.refresh();  
          },500)
       }
     })
  }
  
  return (
    <>
    { (enrollStatus === Enroll_Status.registered) &&
     <>
        <button className={buttons.add_button} onClick={() => onUpdateEnrollment(Enroll_Status.enrolled)}>Enroll</button>
        <button className={buttons.no_show_btn} onClick={() => onUpdateEnrollment(Enroll_Status.noShow)}>No Show</button>
        <button className={buttons.delete_btn_v2} onClick={ () => onUpdateEnrollment(Enroll_Status.cancelled)}>Cancel</button>
    </>
    }
    {(enrollStatus === Enroll_Status.enrolled) &&
      <button className={buttons.delete_btn_v2} onClick={ () => onUpdateEnrollment(Enroll_Status.cancelled)}>Cancel</button>
    }

    {(enrollStatus === Enroll_Status.noShow) && 
         <button className={buttons.add_button} onClick={ () => onUpdateEnrollment(Enroll_Status.enrolled)}>Enroll</button>
    }

    { (enrollStatus === Enroll_Status.cancelled) &&
     <>
        <button className={buttons.add_button} onClick={ () => onUpdateEnrollment(Enroll_Status.enrolled)}>Re Enroll</button>
    </>
    }
       <Toaster position="top-center" richColors  closeButton  />
    </>
  )
}

export default EventEnrollmentsAction