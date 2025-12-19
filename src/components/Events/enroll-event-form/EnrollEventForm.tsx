'use client';
import { ChangeEvent, startTransition, useState} from 'react';
import EventEnrollStudentList from '../event-enroll-list-student/EventEnrollStudentList';
import {searchStudents} from '@/lib/actions/students';
import { Students } from '@/types';
import { LuSearch } from 'react-icons/lu';
import style from './style.module.css';

const EnrollEventForm = () => {
  const [query,setQuery] = useState('');
  const [result,setResult] = useState<Students[]>();

  const handleStudentSearch = (event:ChangeEvent<HTMLInputElement>) =>{
       setQuery(event.target.value);
       
       startTransition(async()=>{
          const result = await searchStudents(query);
          setResult(result);
       })
    }
  
  return (
    <form className={style.enrollment_form}>
      <div className={style.enrollment_form_search}>
         <LuSearch size={25} />
         <input type='text' name='search' id='search' placeholder='Search By Name'
          onChange={(event) => handleStudentSearch(event)}
         />
      </div>
      
      { result && result.length > 0 &&
        <EventEnrollStudentList studentList={result}/>
      }
    </form>
  )
}

export default EnrollEventForm