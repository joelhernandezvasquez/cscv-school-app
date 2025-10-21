'use client';
import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CourseLevelPill from "@/components/ui/course-level-pill/CourseLevelPill";
import { AddPendingCourses } from "@/types";
import style from './style.module.css';
import util from '../../../styles/utils.module.css';
import { addStudentCourses } from "@/lib/actions/students/addStudentCourses";
import { toast, Toaster } from "sonner";

interface Props{
  pendingCourses:AddPendingCourses[],
  studentId:string
}

const ManualCourseTable = ({pendingCourses,studentId}:Props) => {
  // TODO: move all its functionalites to a custom hook
  const [coursesPending,setCourses] = useState<AddPendingCourses[]>(pendingCourses);
  const [coursesAdded,setCoursesAdded] = useState(0);
  const [isPending, startTransition] = useTransition();

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
              redirect('/students');
         },1500)
       }
    });

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

  const onSetCoursesAdded = (coursesChecked:AddPendingCourses[]) =>{
    setCoursesAdded(coursesChecked.filter(c => c.complete).length);
  }

  return (
    <section>
    <Table className={style.student_table}>
    <TableHeader className={style.student_table_header}>
      <TableRow>
        <TableHead className={style.table_text}>Task</TableHead>
        <TableHead className={style.table_text}>Course</TableHead>
          <TableHead className={style.table_text}>Description</TableHead>
        <TableHead className={style.table_text}>Level</TableHead>
      </TableRow>
  </TableHeader>

  <TableBody className={style.table_body}>
    {coursesPending.map((course)=>{
      { return (
      <TableRow key={course.id} className={style.table_row}>
        <TableCell className={`${style.student_row} ${style.student_name_container}`}>
         <input 
           className={style.checkbox}
           type="checkbox" 
           id="courseID" 
           name="courseId"
           checked = {course.complete}
           onChange={() => onCheckCourse(course)}
           />
        </TableCell>
     
        <TableCell className={util.text_left}>
        <p>{course.name}</p>
        </TableCell>

        <TableCell className={`${style.student_courses}`}>
         <p>{course.description}</p> 
        </TableCell>

        <TableCell>
         <CourseLevelPill level={course.level}/>
        </TableCell>
        
    </TableRow> 
    
  )}}
    )}
  </TableBody> 

</Table>
    <form action={onSubmitCourses}>
      <div className={style.buttons_container}>
      <Link className={style.cancel_btn} href="/students"> Cancel </Link>
      <button 
          className={style.add_courses_btn}
          disabled={isPending || coursesAdded===0}
          >
          {isPending ? 'Adding Courses' : `Add Courses (${coursesAdded})`}
      </button>
      </div> 

    </form>
      <Toaster position="top-center" richColors  closeButton  />
</section>
  )
  
}

export default ManualCourseTable 