import { auth } from "@/auth.config";
import { StudentsSummary } from "@/types";
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