
import { Students } from '@/types';

interface Props{
    studentList:Students []
}

const EventEnrollStudentList = ({studentList}:Props) => {
      
  return (
    <div>{JSON.stringify(studentList)}</div>
  )
}

export default EventEnrollStudentList