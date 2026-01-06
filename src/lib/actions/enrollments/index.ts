import { EnrollmentEvent } from "@/types";
import { getValidatedToken } from "../index";


export const getEnrollmentsPerEvent = async(eventId:string):Promise<EnrollmentEvent[]> =>{
    try{
      const token = await getValidatedToken();

      const enrollmentRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${eventId}/enrollments`,{
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      })

      return await enrollmentRequest.json();
    }
    catch(error){
      if(error instanceof Error){
        console.log(error);
        throw new Error(error.message);
    } 
       console.log(error);
        throw new Error('Unknown error occurred while getting the enrollments event');
    }
}