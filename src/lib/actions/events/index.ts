import { EventsSummary } from "@/types";
import { getValidatedToken } from "../index";

export const getEventsSummary = async():Promise<EventsSummary> => {
    try{
      const token = await getValidatedToken();

      const summaryRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/summary`,{
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${token}`,
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
        throw new Error('Unknown error occurred while getting the events summary');
    }
}