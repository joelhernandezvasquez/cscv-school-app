'use client';

import useEventManagement from '@/hooks/UseEventManagement';
import { Toaster } from 'sonner';
import { Enroll_Status } from '@/constants';
import buttons from '../../../styles/buttons.module.css';
interface Props{
    enrollStatus:string,
    enrollmentId:string
}

const EventEnrollmentsAction = ({enrollStatus,enrollmentId}:Props) => {
   const {onUpdateEnrollment} = useEventManagement();

  return (
    <>
    { (enrollStatus === Enroll_Status.registered) &&
     <>
        <button className={buttons.add_button} onClick={() => onUpdateEnrollment(enrollmentId,Enroll_Status.enrolled)}>Enroll</button>
        <button className={buttons.no_show_btn} onClick={() => onUpdateEnrollment(enrollmentId,Enroll_Status.noShow)}>No Show</button>
        <button className={buttons.delete_btn_v2} onClick={ () => onUpdateEnrollment(enrollmentId,Enroll_Status.cancelled)}>Cancel</button>
    </>
    }
    {(enrollStatus === Enroll_Status.enrolled) &&
      <button className={buttons.delete_btn_v2} onClick={ () => onUpdateEnrollment(enrollmentId,Enroll_Status.cancelled)}>Cancel</button>
    }

    {(enrollStatus === Enroll_Status.noShow) && 
         <button className={buttons.add_button} onClick={ () => onUpdateEnrollment(enrollmentId,Enroll_Status.enrolled)}>Enroll</button>
    }

    { (enrollStatus === Enroll_Status.cancelled) &&
     <>
        <button className={buttons.add_button} onClick={ () => onUpdateEnrollment(enrollmentId,Enroll_Status.enrolled)}>Re Enroll</button>
    </>
    }
       <Toaster position="top-center" richColors  closeButton  />
    </>
  )
}

export default EventEnrollmentsAction