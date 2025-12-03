
import { EventItem} from '@/types';
import style from './style.module.css';
import { getFormattedDate } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import { MdOutlinePriceChange } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';
import CourseLevelPill from '@/components/ui/course-level-pill/CourseLevelPill';
import { RiProgress1Line } from 'react-icons/ri';

interface Props{
    event:EventItem
}

const EventDetailInfo = ({event}:Props) => {
    console.log(event);
  return (
    <div className={style.event_info_container}>
        <h3 className='title'> Event Information</h3>
        <ul className={style.event_info}>
            <li className={style.event_info_col}>
              <Calendar size={20} color="#11141A" />
              <p>{getFormattedDate(event.start_date)} - {getFormattedDate(event.end_date)}</p>
            </li>

            <li className={style.event_info_col}>
                <MdOutlinePriceChange size={20} color='#11141A'/>
                <p>${event.price}</p>
            </li>

            <li className={style.event_info_col}>
                <HiUsers size={20} color='#11141A' />
                <p>0</p>
            </li>

            <li className={style.event_info_col}>
                <RiProgress1Line size={20} color="#11141A"/>
                <CourseLevelPill level={event.status}/>
            </li>

        </ul>
       
    </div>
  )
}

export default EventDetailInfo