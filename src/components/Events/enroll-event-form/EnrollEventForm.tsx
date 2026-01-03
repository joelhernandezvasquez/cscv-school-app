'use client';
import { ChangeEvent,startTransition, useState} from 'react';
import EventEnrollStudentList from '../event-enroll-list-student/EventEnrollStudentList';
import {searchStudents} from '@/lib/actions/students';
import { Students } from '@/types';
import { LuSearch } from 'react-icons/lu';
import style from './style.module.css';

interface Props{
  eventId:number,
}

const EnrollEventForm = ({eventId}:Props) => {
  const [query,setQuery] = useState('');
  const [result,setResult] = useState<Students[]>([]);

  const handleStudentSearch = (event:ChangeEvent<HTMLInputElement>) =>{
       const value = (event.target as HTMLInputElement).value;
       setQuery(value);
       
       startTransition(async()=>{
          const result = await searchStudents(value,eventId);
          setResult(result);
       })
    }
  
  return (
    <section className={style.enrollment_form}>
      <div className={style.enrollment_form_search}>
         <LuSearch size={25} />
         <input type='text' name='search' id='search' value={query} placeholder='Search By Name'
          onChange={(event) => handleStudentSearch(event)}
         />
      </div>
      {
        query && <EventEnrollStudentList studentList={result} eventId={eventId} resetSearch={setQuery}/>
      }
        
    </section>
  )
}

export default EnrollEventForm