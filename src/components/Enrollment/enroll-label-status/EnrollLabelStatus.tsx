import { Enroll_Status } from "@/constants";
import style from './style.module.css';

interface Props{
    status:string
}

const EnrollLabelStatus = ({status}:Props) => {
  
  const mappedStatus = new Map([
    [Enroll_Status.registered,'Registered'],
    [Enroll_Status.enrolled,'Enrolled'],
    [Enroll_Status.noShow, 'No Show'],
    [Enroll_Status.cancelled,'Cancelled'],
    [Enroll_Status.completed,'Completed']
  ]);

 return (
    <div className={`${style.status_container} ${style[status]}`}>
        <p>{mappedStatus.get(status as Enroll_Status)}</p>
    </div>
  )
}

export default EnrollLabelStatus