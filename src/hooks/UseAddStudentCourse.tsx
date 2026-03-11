import {useState,useTransition} from "react";
import { redirect } from "next/navigation";
import { AddPendingCourses } from "@/types";
import { addStudentCourses } from "@/lib/actions/students/addStudentCourses";
import { toast } from "sonner";

const UseAddStudentCourse = (pendingCourses:AddPendingCourses[],studentId:string) => {

const [coursesPending,setCourses] = useState<AddPendingCourses[]>(pendingCourses);
const [coursesAdded,setCoursesAdded] = useState(0); 
const [isPending, startTransition] = useTransition();

 const onSetCoursesAdded = (coursesChecked:AddPendingCourses[]) =>{
    setCoursesAdded(coursesChecked.filter(c => c.complete).length);
  }

   const onCheckCourse = (course:AddPendingCourses) =>{
   const updateCourses = coursesPending.map((c)=>{
    if(course.id === c.id){
       return {
        ...course,
        complete:!course.complete
       }
    }
    return c;
   })
    onSetCoursesAdded(updateCourses);
    setCourses(updateCourses);
  }

    const onSubmitCourses = async(formData:FormData) => {
    const courses = coursesPending.filter((c)=> c.complete).map((course)=>{
      return{
        course_id:course.id
      }
    })

    formData.set('studentId', studentId);
    formData.set('courses', JSON.stringify(courses));

      startTransition(async () => {
       const result = await addStudentCourses(formData);
  
       if(result.success){
         toast.success(result.message);
         setTimeout(()=>{
              redirect(`/students/${studentId}`);
         },1500)
       }
    });

  }
   
return {
  coursesPending,
  coursesAdded,
  isPending,
  onCheckCourse,
  onSubmitCourses
 }
}

export default UseAddStudentCourse;