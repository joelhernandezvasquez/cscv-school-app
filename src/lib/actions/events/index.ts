import { EventItem, EventsSummary, PaginationData } from "@/types";
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

export const getEvents = async(query:string,currentPage:number):Promise<EventItem[]> => {
    try{
      const token = await getValidatedToken();

      const eventsRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/search?query=${query}&page=${currentPage}`,{
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      })
    
      return await eventsRequest.json()
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

export const getEventsPagination = async ():Promise<PaginationData> =>{
  try{
      const token = await getValidatedToken();
      const paginationRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/pagination`,{
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      })

      return await paginationRequest.json();
  }
  catch(error){
   if(error instanceof Error){
        console.log(error);
        throw new Error(error.message);
    } 
       console.log(error);
        throw new Error('Unknown error occurred while getting the students pagination');
  }

}

export const validateEventForm = (formData:FormData) =>{
 let errors = {};

 const name = formData.get('name');
 const price = formData.get('price');
 const status = formData.get('eventState');
 const eventDate = JSON.parse(formData.get('eventDate') as string);
 const course = formData.get('course');

  if(!name){
   errors = {
    ...errors,
    name:true
   } 
  }

   if(!price){
   errors = {
    ...errors,
    price:true
   } 
  }
    if(!status){
    errors = {
      ...errors,
      status:true
    }
  }

   if(!eventDate.from || !eventDate.to){
   errors = {
    ...errors,
    eventDate:true
   }
  }

    if(!course){
   errors = {
    ...errors,
    course:true
   }
  }

   
  return errors;
}
