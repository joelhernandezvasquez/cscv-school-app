'use server'; 

import { getValidatedToken } from "..";

export const enrollStudentIntoEvent = async(studentId:number,eventId:number) => {
 
    try{
          const token = await getValidatedToken();
          const enrollStudentRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/enrollments/enroll`,{
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            student_id:studentId,
            event_id:eventId
            })
        })

      return await enrollStudentRequest.json();
    }
     catch(error){
      if(error instanceof Error){
        console.log(error);
        throw new Error(error.message);
    } 
       console.log(error);
        throw new Error('Unknown error occurred while enrolling the student');
    }
}