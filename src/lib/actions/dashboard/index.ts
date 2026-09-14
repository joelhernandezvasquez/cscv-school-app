import { DashboardEventSummary, DashboardStudentRisk } from "@/types";
import { getValidatedToken } from "..";

type DashboardSummary = {
  totalStudents: number;
  totalEnrollments: number;
  totalEvents: number;
};


const parseJsonResponse = async <T>(response: Response, fallbackError: string): Promise<T> => {
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    const rawResponse = await response.text();
    throw new Error(`${fallbackError}. Received non-JSON response (${response.status}): ${rawResponse.slice(0, 120)}`);
  }

  const payload = await response.json();
  if (!response.ok) {
    const errorMessage = (payload as { message?: string })?.message || fallbackError;
    throw new Error(errorMessage);
  }

  return payload as T;
};


export const getDashboardSummary = async():Promise<DashboardSummary> =>{
   try{
        const token = await getValidatedToken();
        const summaryMetrics = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/summary`,{
         method: 'GET',
           headers: {
             'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
       })
  
      return await parseJsonResponse<DashboardSummary>(summaryMetrics, 'Failed to get dashboard summary');
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
  
      return await parseJsonResponse<DashboardEventSummary>(dashboardEventSummary, 'Failed to get dashboard events summary');
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
      
      return await parseJsonResponse<DashboardStudentRisk>(studentsRisk, 'Failed to get dashboard student risk');
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