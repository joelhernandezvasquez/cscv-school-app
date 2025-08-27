'use server';

import { DeleteStudentForm } from "@/types";
import { getValidatedToken } from "..";

export const deleteStudent = async (studentId:number):Promise<DeleteStudentForm> =>{

  try{
       const token = await getValidatedToken();
      
      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student/${studentId}`,{
         method: 'DELETE',
         headers: {
           'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      })
     const response =  await request.json();

     if(response.success){
        return{
            success:true,
            message:response.message
        }
     }

      return{
            success:false,
            message:response.message
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