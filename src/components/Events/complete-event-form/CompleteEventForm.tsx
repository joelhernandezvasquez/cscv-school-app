'use client';
import {useTransition} from 'react';
import {Toaster} from 'sonner';
import useEventManagement from '@/hooks/UseEventManagement';
import buttons from '../../../styles/buttons.module.css';
import style from './style.module.css';

interface Props{
  eventId:number;
}
const CompleteEventForm = ({eventId}:Props) => {
   const [pending] = useTransition();
   const {submitEventCompletion} = useEventManagement();

 const onCancel = () =>{
    window.location.reload();
 }

  return (
    <form className={style.form_complete_event} onSubmit={(event: React.FormEvent<HTMLFormElement>) => submitEventCompletion(event, eventId)}>
       <button className={buttons.add_button}> {!pending ? 'Complete' : 'Completing'}</button>
        <button type="button" className={buttons.delete_btn_v2} onClick={onCancel}>Cancel</button>
        <Toaster position="top-center" richColors  closeButton  />
    </form>
  )
}

export default CompleteEventForm