
import { CompletedCourse, CoursePieChartData, CoursesByLevel, LoginError, PendingCourses } from "@/types";
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

export const formatLevel = (level:string) =>{
       return level
    .replace(/Nivel 1 Jesus Esta Vivo/, "NIVEL_1_JESUS_ESTA_VIVO")
    .replace(/Nivel 2 Jesus Nos Capacita/, "NIVEL_2_JESUS_NOS_CAPACITA")
    .replace(/Nivel 3 Jesus Nos Envia/, "NIVEL_3_JESUS_NOS_ENVIA")
    .replace(/Renacer/, "RENACER_MUJERES")
    .replace(/Renacer/, "RENACER_HOMBRE")
    .replace(/Renacer/, "RENACER_PAREJAS");
}

export const formatLevelToName = (level:string) =>{
     level = level.replaceAll(' ','').toLowerCase();
     
       return level
    .replace(/level1/, "NIVEL_1_JESUS_ESTA_VIVO")
    .replace(/level2/, "NIVEL_2_JESUS_NOS_CAPACITA")
    .replace(/level3/, "NIVEL_3_JESUS_NOS_ENVIA")
    .replace(/Renacer/, "Renacer")
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
    .replace(/cancelled/,"Cancel")
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

export const formatCoursesByLevelToChartData = (coursesByLevel:CoursesByLevel[]):CoursePieChartData[] =>{

 const nivel1 = coursesByLevel.find((element)=> element.level.includes('Nivel 1'));
 const nivel2 = coursesByLevel.find((element)=> element.level.includes('Nivel 2'));
 const nivel3 = coursesByLevel.find((element)=> element.level.includes('Nivel 3'));

 const renacerTotal = coursesByLevel.reduce((acc, course) => {
   if (course.level.toLowerCase().includes('renacer')) {
     return acc + course.courseLevelQuantity;
   }
   return acc;
 }, 0);

 const chartData = [
  { browser: "Nivel 1", visitors: nivel1?.courseLevelQuantity ?? 0, fill: "#a30f12" },
  { browser: "Nivel 2", visitors: nivel2?.courseLevelQuantity ?? 0, fill: "#12a9a6" },
  { browser: "Nivel 3", visitors: nivel3?.courseLevelQuantity ?? 0, fill: "#f5c544" },
  { browser: "Renacer", visitors: renacerTotal, fill: "#5655d7" },
 ];
 return chartData;

}

export const getDiffDays = (eventDate:Date) =>{
  const today = new Date();
   const diffTime = Math.abs(new Date(eventDate).getTime() - today.getTime());
   const diffDays = Math.ceil(diffTime/(1000 * 60 * 60 * 24));
   return diffDays;
}


export function getMonthDifference(eventDate: Date): number {
  const today = new Date();
  const d2 = new Date(eventDate);
  return Math.abs(
    (today.getFullYear() - d2.getFullYear()) * 12 +
    (today.getMonth() - d2.getMonth())
  );
}


