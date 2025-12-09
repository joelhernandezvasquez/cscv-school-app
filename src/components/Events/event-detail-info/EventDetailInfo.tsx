
import { EventItem} from '@/types';
import { getFormattedDate } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import { MdOutlinePriceChange } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';
import CourseLevelPill from '@/components/ui/course-level-pill/CourseLevelPill';
import { RiProgress1Line } from 'react-icons/ri';
import style from './style.module.css';

interface Props{
    event:EventItem
}

const EventDetailInfo = ({event}:Props) => {
    
  return (
    <div>
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