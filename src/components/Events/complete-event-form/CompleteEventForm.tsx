'use client';
import {useTransition} from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import buttons from '../../../styles/buttons.module.css';
import style from './style.module.css';
import { completeEvent } from '@/lib/actions/events';

interface Props{
  eventId:number;
}
const CompleteEventForm = ({eventId}:Props) => {
   const [pending,startTransition] = useTransition();
   const router = useRouter();

  //TODO: MOVE THIS FUNCTION TO THE CUSTOM HOOK
  const submitEventCompletion = async(event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();

     startTransition(async() =>{
        try{
          const request = await completeEvent(eventId);
        
          if(request.success){
            toast.success(request.message); 
              setTimeout(()=>{
                router.refresh();
              },1000)
          }
        }
        catch(error){
            if(error instanceof Error){
              console.log(error);
              throw new Error(error.message);
          } 
            console.log(error);
              throw new Error('Unknown error occurred while getting the events');
          }
     })
  }
 const onCancel = () =>{
    window.location.reload();
 }

  return (
    <form className={style.form_complete_event} onSubmit={submitEventCompletion}>
       <button className={buttons.add_button}> {!pending ? 'Complete' : 'Completing'}</button>
        <button type="button" className={buttons.delete_btn_v2} onClick={onCancel}>Cancel</button>
        <Toaster position="top-center" richColors  closeButton  />
    </form>
  )
}

export default CompleteEventForm