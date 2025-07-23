import { auth } from "@/auth.config";
import { Students, StudentsSummary } from "@/types";
import { Session } from "next-auth";

export const getStudentSummary = async():Promise<StudentsSummary> => {
    try{
       const session = await auth();
       const TOKEN = (session as Session & { token?: string })?.token;
       
      const summaryRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student/summary`,{
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
      })

      return await summaryRequest.json();
    }
    catch(error){
      if(error instanceof Error){
        console.log(error);
        throw new Error(error.message);
    } 
       console.log(error);
        throw new Error('Unknown error occurred while getting the students summary');
    }
}

export const fetchStudents = async():Promise<Students[]> =>{
  try{
       const session = await auth();
       const TOKEN = (session as Session & { token?: string })?.token;

       const studentRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student/students`,{
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
          }
      })
      return await studentRequest.json();

  }
  catch(error){
        if(error instanceof Error){
        console.log(error);
        throw new Error(error.message);
    } 
       console.log(error);
        throw new Error('Unknown error occurred while getting the students');
  }
}