
import { Enroll_Status } from '@/constants';
import buttons from '../../../styles/buttons.module.css';

interface Props{
    enrollStatus:string
}


const EventEnrollmentsAction = ({enrollStatus}:Props) => {
  return (
    <>
    { (enrollStatus === Enroll_Status.registered) &&
     <>
        <button className={buttons.add_button}>Enroll</button>
        <button className={buttons.no_show_btn}>No Show</button>
        <button className={buttons.delete_btn_v2}>Cancel</button>
    </>
    }
    {(enrollStatus === Enroll_Status.enrolled) &&
      <button className={buttons.delete_btn_v2}>Cancel</button>
    }

    {(enrollStatus === Enroll_Status.noShow) && 
         <button className={buttons.add_button}>Enroll</button>
    }

    { (enrollStatus === Enroll_Status.cancelled) &&
     <>
        <button className={buttons.add_button}>Re Enroll</button>
    </>
    }
       
    </>
  )
}

export default EventEnrollmentsAction