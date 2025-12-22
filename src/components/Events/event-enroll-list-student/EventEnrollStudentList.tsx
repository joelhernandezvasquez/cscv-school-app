import Avatar from '@/components/ui/avatar/Avatar';
import EmptyStudentSearch from '../empty-student-search/EmptyStudentSearch';
import { Students } from '@/types';
import style from './style.module.css';
import button from '../../../styles/buttons.module.css';

interface Props{
    studentList:Students []
}

const EventEnrollStudentList = ({studentList}:Props) => {    
  return (
    <>
     {
      studentList.length > 0 
      ? (
        <ul className={style.student_list_container}>
      {studentList.map((student)=>{
        return <li className={style.student_item} key={student.id}>
                 <div className={style.student_item_info_header}>
                     <Avatar width={40} height={40}/>
                     <div>
                         <h3>{student.first_name} {student.last_name}</h3>
                          <p>
                            <span>{student.email} </span>
                            <span>{student.phone}</span>
                          </p>
                     </div>
                    
                 </div>

                 <button className={button.add_button}>Register</button>
              </li>
      })}
       </ul>
      )
      :
      <EmptyStudentSearch/>
     }
    
    </>
  )
}

export default EventEnrollStudentList