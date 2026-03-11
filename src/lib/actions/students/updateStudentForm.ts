'use server';
import { validateStudentForm } from "./index";
import { AddStudentFormState } from "@/types";
import { getValidatedToken } from "..";

export const updateStudent = async (
  previousState: AddStudentFormState,
  formData: FormData
): Promise<AddStudentFormState> => {

  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const phoneNumber = formData.get('phoneNumber');
  const gender = formData.get('genderRadio');
  const active = formData.get('isActive');
  const street = formData.get('street');
  const city = formData.get('city');
  const state = formData.get('state');
  const zipcode = formData.get('zipcode');
  const parroquia = formData.get('parroquia');
  const medicalCondition = formData.get('medicalCondition');
  const studentId = formData.get('id');
  
  const formErrors = validateStudentForm(formData);

  if (Object.keys(formErrors).length > 0) {
    return {
      success: false,
      message: 'Validation Failed',
      errors: formErrors
    };
  }
  
  try {
    const token = await getValidatedToken();
       
    const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student/${studentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phoneNumber,
        gender: gender,
        active:active ==='on' ? true : false,
        direccion: `${street},${city},${state},${zipcode}`,
        parroquia: parroquia,
        asuntos_medicos: medicalCondition
      })
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
        message: 'Student has been Updated.'
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
