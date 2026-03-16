import { Courses } from "@/types";
import { getValidatedToken } from "../index";

 export const fetchCourses = async ():Promise<Courses[]> =>{
    try{
      const token = await getValidatedToken();
      const coursesRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/courses`,{
       method: 'GET',
         headers: {
           'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
     })

     return await coursesRequest.json();
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
