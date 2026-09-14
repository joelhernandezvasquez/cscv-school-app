import { Courses, CoursesByLevel } from "@/types";
import { getValidatedToken } from "../index";
import { formatLevelToName } from "@/lib/utils";

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

 export const getCoursesByLevel = async ():Promise<CoursesByLevel[]> =>{
    try{
      const token = await getValidatedToken();
      const coursesRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/total-courses-level`,{
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

 export const searchCourses = async (query:string):Promise<Courses[]> =>{
    
   try{
      const token = await getValidatedToken();
      const courseQueryMapped = formatLevelToName(query);
      const coursesRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/search?query=${courseQueryMapped}`,{
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

 export const validateCourseForm = (formData:FormData) =>{
 let errors = {};

 const name = formData.get('name');
 const description = formData.get('description');
 const level = formData.get('level');

  if(!name){
   errors = {
    ...errors,
    name:true
   } 
  }

   if(!description){
   errors = {
    ...errors,
    description:true
   } 
  }
    if(!level){
    errors = {
      ...errors,
      level:true
    }
  }
   
  return errors;
}


