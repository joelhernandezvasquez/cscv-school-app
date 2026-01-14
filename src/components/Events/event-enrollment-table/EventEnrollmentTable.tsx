import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EnrollEventForm from '../enroll-event-form/EnrollEventForm';
import RegisterStudentBtn from './RegisterStudentBtn';
import { EnrollmentEvent, EventItem } from '@/types';
import { getFormattedDate } from '@/lib/utils';
import EmptyEnrollmentState from '../empty-enrollment-table/EmptyEnrollmentTable';
import EventEnrollmentsAction from '../event-enrollments-action/EventEnrollmentsAction';
import style from './style.module.css';

interface Props{
  event:EventItem,
  enrollmentEvent:EnrollmentEvent[]
}

const EventEnrollmentTable = ({event,enrollmentEvent}:Props) => {
   const {course,start_date,end_date} = event;
   const course_date = (`${getFormattedDate(start_date)} - ${getFormattedDate(end_date)}`);
  
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
     {
       enrollmentEvent.length > 0 ?
       (
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

  <TableBody>
    
    {enrollmentEvent.map((enroll)=>{
      return <TableRow className={style.table_row} key={enroll.enrollmentId}>
                <TableCell className={`${style.event_row}`}>
                    <div className={style.student_name}>
                      <p>{enroll.fullName}</p>
                    </div>
                </TableCell>
     
                <TableCell className={`${style.event_row}`}>
                  <p>{enroll.email}</p>
                </TableCell>

                <TableCell className={`${style.event_row}`}>
                  <p>{enroll.phone}</p>
                </TableCell>

              <TableCell className={`${style.event_row}`}>
              <p>{enroll.status}</p>
              </TableCell>

              <TableCell className={style.enrollment_action}>
                  <EventEnrollmentsAction 
                    enrollStatus={enroll.status}
                    enrollmentId={enroll.enrollmentId}
                  />
              </TableCell>
        </TableRow>
    })}

            </TableBody> 

        </Table> 
       )
       :
        <EmptyEnrollmentState/>

     }
           
</div>
  )
}

export default EventEnrollmentTable