'use server';

import { AddEventFormState } from "@/types";
import { getValidatedToken } from "..";
import { validateEventForm } from ".";

export const addEvent = async (
  previousState: AddEventFormState,
  formData: FormData,
): Promise<AddEventFormState> => {

 const name = formData.get('name');
 const price = formData.get('price');
 const status = formData.get('eventState');
 const eventDate = JSON.parse(formData.get('eventDate') as string);
 const course = formData.get('course');

const formErrors = validateEventForm(formData);

  if (Object.keys(formErrors).length > 0) {
    return {
      success: false,
      message: 'Validation Failed',
      errors: formErrors
    };
  }

  
  try {
   const token = await getValidatedToken();
       
    const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: name,
          course_id:parseInt(course?.toString()as string),
          price:parseInt(price?.toString() as string),
          start_date:eventDate?.from.toString(),
          end_date:eventDate?.to.toString(),
          location:"207 Hendrix Street, Brooklyn, NY 11207",
          status:status
      })
    });

    if (!request.ok) {
      console.log(request);
      return {
        success: false,
        message: `Server error: ${request.statusText}`
      };
    }

    const response = await request.json();
    if (response) {
      console.log(response);
      return {
        success: true,
        message: 'Event has been added.'
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
};
