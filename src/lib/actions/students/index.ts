import { Students, StudentsPagination, StudentsSummary } from "@/types";
import { getValidatedToken } from "../index";

export const getStudentSummary = async():Promise<StudentsSummary> => {
    try{
      const token = await getValidatedToken();

      const summaryRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student/summary`,{
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      })

      return await summaryRequest.json();
    }
    catch(error){
      if(error instanceof Error){
        console.log(error);
        throw new Error(error.message);
    } 
       console.log(error);
        throw new Error('Unknown error occurred while getting the students summary');
    }
}

export const fetchStudents = async(query:string,page:string | number,sortBy:string):Promise<Students[]> =>{
  try{
       const token = await getValidatedToken();
       const studentRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student/search?query=${query}&page=${page}&sortBy=${sortBy}`,{
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      })
      return await studentRequest.json();

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

export const getStudentsPagination = async ():Promise<StudentsPagination> =>{
  try{
      const token = await getValidatedToken();
      const paginationRequest = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student/pagination`,{
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      })

      return await paginationRequest.json();

  }
  catch(error){
   if(error instanceof Error){
        console.log(error);
        throw new Error(error.message);
    } 
       console.log(error);
        throw new Error('Unknown error occurred while getting the students pagination');
  }

}

export const validateStudentForm = (formData:FormData) =>{
 let errors = {};

  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const phoneNumber = formData.get('phoneNumber');
  const gender = formData.get('genderRadio');
  const street = formData.get('street');
  const city = formData.get('city');
  const state = formData.get('state');
  const zipcode = formData.get('zipcode');
  const parroquia = formData.get('parroquia');

  if(!firstName){
   errors = {
    ...errors,
    firstName:true
   } 
  }

   if(!lastName){
   errors = {
    ...errors,
    lastName:true
   } 
  }

    if(!email){
    errors = {
      ...errors,
      email:true
    }
  }

   if(!phoneNumber){
   errors = {
    ...errors,
    phoneNumber:true
   }
  }

    if(!phoneNumber){
   errors = {
    ...errors,
    gender:true
   }
  }

   if(!gender){
   errors = {
    ...errors,
    gender:true
   }
  }

   if(!street){
   errors = {
    ...errors,
    street:true
   }
  }

   if(!city){
   errors = {
    ...errors,
    city:true
   }
  }

   if(!state){
   errors = {
    ...errors,
   state:true
   }
  }

   if(!zipcode){
   errors = {
    ...errors,
    zipcode:true
   }
  }

   if(!parroquia){
   errors = {
    ...errors,
    parroquia:true
   }
  }
  return errors;
}

