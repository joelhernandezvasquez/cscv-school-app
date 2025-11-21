'use server';

//import { validateStudentForm } from "./index";
import { AddEventFormState } from "@/types";
import { getValidatedToken } from "..";

export const addEvent = async (
  previousState: AddEventFormState,
  formData: FormData,
): Promise<AddEventFormState> => {


 const name = formData.get('name');
 const price = formData.get('price');
 const status = formData.get('eventState');
 const eventDate = JSON.parse(formData.get('eventDate') as string);
 const course = formData.get('course');

 console.log({name,price,status});
 console.log(eventDate);
 console.log(course);


  
//   const formErrors = validateStudentForm(formData);

//   if (Object.keys(formErrors).length > 0) {
//     return {
//       success: false,
//       message: 'Validation Failed',
//       errors: formErrors
//     };
//   }
  
//   try {
//    const token = await getValidatedToken();
       
//     const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student/students`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         first_name: firstName,
//         last_name: lastName,
//         email: email,
//         phone: phoneNumber,
//         gender: gender,
//         direccion: `${street},${city},${state},${zipcode}`,
//         parroquia: parroquia,
//         asuntos_medicos: medicalCondition || "Ninguno"
//       })
//     });

//     if (!request.ok) {
//       return {
//         success: false,
//         message: `Server error: ${request.statusText}`
//       };
//     }

//     const response = await request.json();
//     if (response) {
//       return {
//         success: true,
//         message: 'Student has been added.'
//       };
//     }
    
//     return {
//       success: false,
//       message: 'No data returned from server'
//     };
      
//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       message: 'An unexpected error occurred'
//     };
//   }
};
