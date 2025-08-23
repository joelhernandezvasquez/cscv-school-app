import { LoginError } from "@/types";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const checkLoginFormErrors = (email:string,password:string):LoginError =>{
    if(email.length === 0){
        return {
            isError:true,
            message:'Email cannot be empty'
        }
    }

     if(password.length === 0){
        return {
            isError:true,
            message:'Password cannot be empty'
        }
    }
    return {
        isError:false
    }
}

export const getPageNameFromPath = (path:string) =>{
  let pathName = path.replace('/','');
  const firstLetter = pathName[0].toUpperCase();
  pathName = `${firstLetter}${pathName.slice(1)}`;
  return pathName;
}

export const getFirstLetterUpperCase = (text:string) =>{
  const firstLetter = text[0].toUpperCase();
  return `${firstLetter}${text.slice(1)}`;
}
export const getOnlyUserName = (userName:string) =>{
  const name = getFirstLetterUpperCase(userName);
  const whiteSpace = name.indexOf(' ');
  return `${name.slice(0,whiteSpace)}`;

}

export const getFormattedDate = (date:Date) =>{
 return new Date(date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
}

export const getFormattedAddress = (address:string) =>{
    const studentDirrection = address.split(',');
    const studentAddress = {
    street:studentDirrection[0],
    city:studentDirrection[1],
    state:studentDirrection[2],
    zipcode:studentDirrection[3]
   }
   return studentAddress;
}