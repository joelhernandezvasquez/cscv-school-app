'use client';
import Link from "next/link";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table";
import UseAddStudentCourse from "@/hooks/UseAddStudentCourse";
import CourseLevelPill from "@/components/ui/course-level-pill/CourseLevelPill";
import { AddPendingCourses } from "@/types";
import {Toaster} from "sonner";
import style from './style.module.css';
import util from '../../../styles/utils.module.css';
interface Props{
  pendingCourses:AddPendingCourses[],
  studentId:string
}

const ManualCourseTable = ({pendingCourses,studentId}:Props) => {
const {
  coursesPending,
  coursesAdded,
  isPending,
  onCheckCourse,
  onSubmitCourses
  } = UseAddStudentCourse(pendingCourses,studentId);

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