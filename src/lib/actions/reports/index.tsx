import { cache } from "react";
import { getValidatedToken } from "..";

export const getCompletionCourseList = async(query:string) =>{
   try{
       const token = await getValidatedToken();
       const listRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/report/course-completion?query=${query}`,{
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                   'Content-Type': 'application/json'
                 }
             })
             return await listRequest.json();
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

const fetchPaginatedCompletionStatusCourseList = async(query:string, status:string, currentPage?:string | number) =>{
   try{
       const token = await getValidatedToken();
       const listRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/report/${query}/course-completion?status=${status}&page=${currentPage}`,{
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                   'Content-Type': 'application/json'
                 }
             })
             return await listRequest.json();
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

// Deduped per request so the table and the pagination share one backend call.
export const getPaginatedCompletionStatusCourseList = cache(fetchPaginatedCompletionStatusCourseList);
