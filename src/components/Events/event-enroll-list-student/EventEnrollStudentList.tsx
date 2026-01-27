import {useTransition} from 'react';
import useEventManagement from '@/hooks/UseEventManagement';
import {Toaster } from 'sonner';
import Avatar from '@/components/ui/avatar/Avatar';
import EmptyStudentSearch from '../empty-student-search/EmptyStudentSearch';
import { Students } from '@/types';
import style from './style.module.css';
import button from '../../../styles/buttons.module.css';

interface Props{
    studentList:Students []
    eventId:number,
    resetSearch:(value:string) => void
}

const EventEnrollStudentList = ({studentList,eventId,resetSearch}:Props) => {   
    
   const [isPending] = useTransition();
   const {handleEnrollStudentIntoEvent} = useEventManagement()
   
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

                        <button 
                         className={button.add_button} 
                         onClick={()=>handleEnrollStudentIntoEvent(student.id,eventId,resetSearch)}>{!isPending? 'Register' :'Registering...'}
                        </button>
                      </li>
              })}
        </ul>
              )
              :
              <EmptyStudentSearch/>
            }

             <Toaster position="top-center" richColors  closeButton  />
            
    </>
  )
}

export default EventEnrollStudentList