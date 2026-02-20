import { DashboardEventSummary, DashboardStudentRisk } from "@/types";
import { getValidatedToken } from "..";


export const getDashboardSummary = async() =>{
   try{
        const token = await getValidatedToken();
        const summaryMetrics = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/summary`,{
         method: 'GET',
           headers: {
             'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
       })
  
       return await summaryMetrics.json();
      }
      catch(error){
        if(error instanceof Error){
                console.log(error);
                throw new Error(error.message);
            } 
              console.log(error);
                throw new Error('Unknown error occurred while getting the courses');
          }
}

export const getDashboardEventsSummary = async():Promise<DashboardEventSummary>=>{
   try{
        const token = await getValidatedToken();
        const dashboardEventSummary = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/events/summary`,{
         method: 'GET',
           headers: {
             'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
       })
  
       return await dashboardEventSummary.json();
      }
      catch(error){
        if(error instanceof Error){
                console.log(error);
                throw new Error(error.message);
            } 
              console.log(error);
                throw new Error('Unknown error occurred while getting the courses');
          }
}

export const getDashboardStudentRisk = async():Promise<DashboardStudentRisk> =>{
   try{
        const token = await getValidatedToken();
        const studentsRisk = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/students/risk`,{
         method: 'GET',
           headers: {
             'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
       })
  
       return await studentsRisk.json();
      }
      catch(error){
        if(error instanceof Error){
                console.log(error);
                throw new Error(error.message);
            } 
              console.log(error);
                throw new Error('Unknown error occurred while getting the courses');
          }
}