'use server';

import { DeleteStudentForm } from "@/types";
import { getValidatedToken, pathId } from "..";

export const deleteStudent = async (studentId:number):Promise<DeleteStudentForm> =>{

  try{
       const token = await getValidatedToken();
      
      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student/${pathId(studentId)}`,{
         method: 'DELETE',
         headers: {
           'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      })
     const response = await request.json().catch(() => ({}));

     if(request.ok && response.success){
        return{
            success:true,
            message:response.message
        }
     }

     // Backends often fail with an `error` key and no `message`, so fall back to it and the status.
     console.log('Delete student failed', request.status, response);
     return{
            success:false,
            message:response.message || response.error || `The server rejected the request (${request.status}).`
        }
  }
  catch(error){
   if(error instanceof Error){
        console.log(error);
        throw new Error(error.message);
    } 
       console.log(error);
       return{
            success:false,
            message:'Error ocurred'
        }
  }
  


}