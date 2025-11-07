import { CompletedCourse, LoginError, PendingCourses } from "@/types";
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
  
   // it is a Slug page then
  if(pathName.includes('/')){
    const slashIndex = pathName.indexOf('/');
   return pathName.slice(0,slashIndex);
  }
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

export const getCoursePercentange = (completed:number,currentQuantity:number) =>{
  return (completed / currentQuantity * 100).toFixed(2);
}

export const formatCourseLevel = (level:string) =>{
       return level
    .replace(/NIVEL_1_JESUS_ESTA_VIVO/, "level1")
    .replace(/NIVEL_2_JESUS_NOS_CAPACITA/, "level2")
    .replace(/NIVEL_3_JESUS_NOS_ENVIA/, "level3")
    .replace(/RENACER_MUJERES/, "renacer")
    .replace(/RENACER_HOMBRE/, "renacer")
    .replace(/RENACER_PAREJAS/, "renacer");
}

export const formatCourseLevelName = (level:string) =>{
       return level
    .replace(/NIVEL_1_JESUS_ESTA_VIVO/, "Nivel 1")
    .replace(/NIVEL_2_JESUS_NOS_CAPACITA/, "Nivel 2")
    .replace(/NIVEL_3_JESUS_NOS_ENVIA/, "Nivel 3")
    .replace(/RENACER_MUJERES/, "Renacer")
    .replace(/RENACER_HOMBRE/, "Renacer")
    .replace(/RENACER_PAREJAS/, "Renacer");
}

export const formatLevelName = (level:string) =>{
       return level
    .replace(/level1/, "Nivel 1")
    .replace(/level2/, "Nivel 2")
    .replace(/level3/, "Nivel 3")
    .replace(/ongoing/,"Active")
    .replace(/upcoming/,"Upcoming")
    .replace(/complete/,"Complete")
  
}

export const getCoursesFormatted = (courses:PendingCourses [] | CompletedCourse[]) =>{
  return courses.map((course)=>{
    return{
      ...course,
      level:formatCourseLevel(course.level),
      nivel:formatCourseLevelName(course.level)
    }
  })
}

export const mappedPendingCourses = (pendingCourses:PendingCourses[]) =>{
 return pendingCourses.map((course)=>{
  return{
     id:course.id,
     name:course.name,
     description:course.description,
     level:formatCourseLevel(course.level),
     complete:false,
     date:null
  }
 })
}

