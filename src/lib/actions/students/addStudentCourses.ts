'use server'

import { getValidatedToken } from "..";

export const addStudentCourses = async(formData:FormData) =>{
    try{
      const token = await getValidatedToken();
      const studentId = formData.get('studentId') as string;
     const courses = JSON.parse(formData.get('courses') as string);
      const addCoursesRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student/${studentId}/courses/manual-add`,{
       method: 'POST',
         headers: {
           'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            courses:courses
          })
     })

     return await addCoursesRequest.json();
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
