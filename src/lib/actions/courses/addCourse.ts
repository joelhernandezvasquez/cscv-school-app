'use server'

import { AddCourseFormState } from "@/types"
import { validateCourseForm } from ".";
import { getValidatedToken } from "..";
import { formatLevel } from "@/lib/utils";

export const addCourse = async(
  previousState:AddCourseFormState,
  formData: FormData,
):Promise<AddCourseFormState> =>{
  
 const name = formData.get('name');
 const description = formData.get('description');
 const level = formData.get('level');

 const formErrors = validateCourseForm(formData);

   if (Object.keys(formErrors).length > 0) {
    return {
      success: false,
      message: 'Validation Failed',
      errors: formErrors
    };
  }
  
    try {
     const token = await getValidatedToken();

     const payload = new FormData();
     payload.append('name', name as string);
     payload.append('description', description as string);
     payload.append('level', formatLevel(level as string));

     const image = formData.get('image');
     if (image instanceof File && image.size > 0) {
       payload.append('image_file', image);
     }

         const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payload
      });
       
      if (!request.ok) {
        return {
          success: false,
          message: `Server error: ${request.statusText}`
        };
      }
  
      const response = await request.json();
      if (response) {
        return {
          success: true,
          message: 'Course has been added.'
        };
      }
      
      return {
        success: false,
        message: 'No data returned from server'
      };
        
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'An unexpected error occurred'
      };
    }

}