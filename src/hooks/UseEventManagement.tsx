import { useRouter } from "next/navigation";
import {UpdateEventFormState } from "@/types";
import { toast } from "sonner";
import { startTransition } from "react";
import { updateEvent } from "@/lib/actions/events/updateEvent";
import { completeEvent } from "@/lib/actions/events";
import { enrollStudentIntoEvent } from "@/lib/actions/enrollments/enrollStudentIntoEvent.ts";
import { updateEnrollment } from "@/lib/actions/enrollments";

const useEventManagement = () => {
       const router = useRouter();

          const customUpdateEvent = async (prevState: UpdateEventFormState, formData: FormData) => {
              const result = await updateEvent(prevState, formData);
              if (result.success) {
                toast.success(result.message);
                setTimeout(() => {
                  router.refresh();
                  window.location.reload()
                }, 1000);
              }
              return result;
            };

         const submitEventCompletion = async(event: React.FormEvent<HTMLFormElement>,eventId:number) =>{
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

           const handleEnrollStudentIntoEvent = (studentId:number,eventId:number,cb:(value:string)=>void) =>{
                startTransition(async()=>{
                  const {success,message} = await enrollStudentIntoEvent(studentId,eventId);
            
                  if(success){
                    toast.success(message); 
                    setTimeout(()=>{
                         cb('');
                        router.refresh();
                    },1500)
                     
                  }
                })
            }

              const onUpdateEnrollment = (enrollmentId:string,status:string) =>{
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
       
    return {
       customUpdateEvent,
       submitEventCompletion,
       handleEnrollStudentIntoEvent,
       onUpdateEnrollment
    }
   
}

export default useEventManagement