import { LoginError } from "@/types";


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