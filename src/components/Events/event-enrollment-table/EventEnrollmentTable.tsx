import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EnrollEventForm from '../enroll-event-form/EnrollEventForm';
import RegisterStudentBtn from './RegisterStudentBtn';
import ActionButton from '@/components/ui/action-button/ActionButton';
import { EventItem } from '@/types';
import { getFormattedDate } from '@/lib/utils';
import style from './style.module.css';
import buttons from '../../../styles/buttons.module.css';
import util from '../../../styles/utils.module.css';

interface Props{
  event:EventItem
}

const EventEnrollmentTable = ({event}:Props) => {
   const {course,start_date,end_date} = event;
   const course_date = (`${getFormattedDate(start_date)} - ${getFormattedDate(end_date)}`) 

  return (
    <div className={style.event_enrollment_table}>
        <header className={style.event_enrollment_header}>
            <h2 className='title'>Enrollment</h2>
            <RegisterStudentBtn
             course={course.name}
             date={course_date}
            >
            <EnrollEventForm eventId={event.id}/>
          </RegisterStudentBtn>
        </header>

     <Table className={style.enrollment_table}>
      <TableHeader>
        <TableRow>
          <TableHead className={style.table_text}>Name</TableHead>
          <TableHead className={style.table_text}>Email </TableHead>
          <TableHead className={style.table_text}>Phone Number</TableHead>
          <TableHead className={style.table_text}>Status</TableHead>
          <TableHead className={style.text_center}>Actions</TableHead>
        </TableRow>
    </TableHeader>

  {/* <TableBody>

      <TableRow className={style.table_row}>
        <TableCell className={`${style.event_row}`}>
          <div className={style.student_name}>
            <p>Joel Hernandez</p>
          </div>
        </TableCell>
     
        <TableCell className={`${style.event_row}`}>
          <p>joel.h@gmail.com</p>
        </TableCell>

        <TableCell className={`${style.event_row}`}>
          <p>(646)-841-6837</p>
        </TableCell>

        <TableCell className={`${style.event_row}`}>
        <p>Enrolled</p>
        </TableCell>

        <TableCell className={style.enrollment_action}>
         <button className={buttons.add_button}>Complete</button>
         <button className={buttons.delete_btn_v2}>Cancel</button>
        </TableCell>
    
    </TableRow> 

      <TableRow className={style.table_row}>
        <TableCell className={`${style.event_row} ${style.student_name_container}`}>
          <div className={style.student_name}>
            <p>Joel Hernandez</p>
          </div>
        </TableCell>
     
        <TableCell className={`${style.student_courses}`}>
          <p>joel.h@gmail.com</p>
        </TableCell>

        <TableCell>
          <p>(646)-841-6837</p>
        </TableCell>

        <TableCell className={`${style.status_action}`}>
        <p>Enrolled</p>
        </TableCell>

        <TableCell className={style.enrollment_action}>
         <button className={buttons.add_button}>Complete</button>
         <button className={buttons.delete_btn_v2}>Cancel</button>
        </TableCell>
    
    </TableRow> 

      <TableRow className={style.table_row}>
        <TableCell className={`${style.student_row} ${style.student_name_container}`}>
          <div className={style.student_name}>
            <p>Joel Hernandez</p>
          </div>
        </TableCell>

        <TableCell className={`${style.student_courses}`}>
          <p>joel.h@gmail.com</p>
        </TableCell>

        <TableCell>
          <p>(646)-841-6837</p>
        </TableCell>

        <TableCell className={`${style.status_action}`}>
        <p>Enrolled</p>
        </TableCell>

        <TableCell className={style.enrollment_action}>
         <button className={buttons.add_button}>Complete</button>
         <button className={buttons.delete_btn_v2}>Cancel</button>
        </TableCell>
    
    </TableRow> 

      <TableRow className={style.table_row}>
        <TableCell>
          <div className={style.student_name}>
            <p>Joel Hernandez</p>
          </div>
        </TableCell>

        <TableCell className={`${style.student_courses}`}>
          <p>joel.h@gmail.com</p>
        </TableCell>

        <TableCell>
          <p>(646)-841-6837</p>
        </TableCell>

        <TableCell className={`${style.status_action}`}>
        <p>Enrolled</p>
        </TableCell>

        <TableCell className={style.enrollment_action}>
         <button className={buttons.add_button}>Complete</button>
         <button className={buttons.delete_btn_v2}>Cancel</button>
        </TableCell>
    
    </TableRow> 

      <TableRow className={style.table_row}>
        <TableCell className={`${style.student_row} ${style.student_name_container}`}>
          <div className={style.student_name}>
            <p>Joel Hernandez</p>
          </div>
        </TableCell>
    
        <TableCell className={`${style.student_courses}`}>
          <p>joel.h@gmail.com</p>
        </TableCell>

        <TableCell>
          <p>(646)-841-6837</p>
        </TableCell>

        <TableCell className={`${style.status_action}`}>
        <p>Enrolled</p>
        </TableCell>

        <TableCell className={style.enrollment_action}>
         <button className={buttons.add_button}>Complete</button>
         <button className={buttons.delete_btn_v2}>Cancel</button>
        </TableCell>
    
    </TableRow> 

    <TableRow className={style.table_row}>
        <TableCell className={`${style.event_row}`}>
          <div className={style.student_name}>
            <p>Joel Hernandez</p>
          </div>
        </TableCell>
     

        <TableCell className={`${style.event_row}`}>
          <p>joel.h@gmail.com</p>
        </TableCell>

        <TableCell className={`${style.event_row}`}>
          <p>(646)-841-6837</p>
        </TableCell>

        <TableCell className={`${style.event_row}`}>
        <p>Enrolled</p>
        </TableCell>

        <TableCell className={style.enrollment_action}>
         <button className={buttons.add_button}>Complete</button>
         <button className={buttons.delete_btn_v2}>Cancel</button>
        </TableCell>
    
    </TableRow> 

      <TableRow className={style.table_row}>
        <TableCell className={`${style.event_row} ${style.student_name_container}`}>
          <div className={style.student_name}>
            <p>Joel Hernandez</p>
          </div>
        </TableCell>
     

        <TableCell className={`${style.student_courses}`}>
          <p>joel.h@gmail.com</p>
        </TableCell>

        <TableCell>
          <p>(646)-841-6837</p>
        </TableCell>

        <TableCell className={`${style.status_action}`}>
        <p>Enrolled</p>
        </TableCell>

        <TableCell className={style.enrollment_action}>
         <button className={buttons.add_button}>Complete</button>
         <button className={buttons.delete_btn_v2}>Cancel</button>
        </TableCell>
    
    </TableRow> 

      <TableRow className={style.table_row}>
        <TableCell className={`${style.student_row} ${style.student_name_container}`}>
          <div className={style.student_name}>
            <p>Joel Hernandez</p>
          </div>
        </TableCell>
     

        <TableCell className={`${style.student_courses}`}>
          <p>joel.h@gmail.com</p>
        </TableCell>

        <TableCell>
          <p>(646)-841-6837</p>
        </TableCell>

        <TableCell className={`${style.status_action}`}>
        <p>Enrolled</p>
        </TableCell>

        <TableCell className={style.enrollment_action}>
         <button className={buttons.add_button}>Complete</button>
         <button className={buttons.delete_btn_v2}>Cancel</button>
        </TableCell>
    
    </TableRow> 

      <TableRow className={style.table_row}>
        <TableCell className={`${style.student_row} ${style.student_name_container}`}>
          <div className={style.student_name}>
            <p>Joel Hernandez</p>
          </div>
        </TableCell>
  
        <TableCell className={`${style.student_courses}`}>
          <p>joel.h@gmail.com</p>
        </TableCell>

        <TableCell>
          <p>(646)-841-6837</p>
        </TableCell>

        <TableCell className={`${style.status_action}`}>
        <p>Enrolled</p>
        </TableCell>

        <TableCell className={style.enrollment_action}>
         <button className={buttons.add_button}>Complete</button>
         <button className={buttons.delete_btn_v2}>Cancel</button>
        </TableCell>
    
    </TableRow> 

      <TableRow className={style.table_row}>
        <TableCell className={`${style.student_row} ${style.student_name_container}`}>
          <div className={style.student_name}>
            <p>Joel Hernandez</p>
          </div>
        </TableCell>

        <TableCell className={`${style.student_courses}`}>
          <p>joel.h@gmail.com</p>
        </TableCell>

        <TableCell>
          <p>(646)-841-6837</p>
        </TableCell>

        <TableCell className={`${style.status_action}`}>
        <p>Enrolled</p>
        </TableCell>

        <TableCell className={style.enrollment_action}>
         <button className={buttons.add_button}>Complete</button>
         <button className={buttons.delete_btn_v2}>Cancel</button>
        </TableCell>
    
    </TableRow> 
  
  </TableBody> */}

</Table> 
  
        
    </div>
  )
}

export default EventEnrollmentTable