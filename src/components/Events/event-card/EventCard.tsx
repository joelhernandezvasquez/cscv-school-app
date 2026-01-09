import Link from 'next/link';
import CourseLevelIcon from '@/components/ui/course-icon/CourseLevelIcon';
import CourseLevelPill from '@/components/ui/course-level-pill/CourseLevelPill';
import { Calendar} from 'lucide-react';
import { MdOutlinePriceChange } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';
import { EventItem } from '@/types';
import { formatCourseLevel, getFormattedDate } from '@/lib/utils';
import style from './style.module.css';
import util from '../../../styles/utils.module.css';
import buttons from '../../../styles/buttons.module.css';

interface Props{
  event:EventItem
}
const EventCard = ({event}:Props) => {
  return (
    <div className={`${style.card} ${util.card_container}`}>
      
      <div className={style.card_col_header}>
         <CourseLevelIcon level={formatCourseLevel(event.course.level)} width={50} height={50} />
         <CourseLevelPill level={event.status}/>
      </div>

      <h3 className={style.course_card_title}>{event.name}</h3>

      <div className={style.card_col}>
        <span className={style.event_calendar_icon}>
          <Calendar size={20} color="#11141A" />
        </span>
        <p>{getFormattedDate(event.start_date)} - {getFormattedDate(event.end_date)}</p>
      </div>

      <div className={style.card_col}>
        <span className={style.event_price_icon}>
         <MdOutlinePriceChange size={20} color='#11141A'/>
        </span>
        <p>${event.price}</p>
      </div>

        <div className={style.card_col}>
        <span className={style.event_price_icon}>
        <HiUsers size={20} color='#11141A' />
        </span>
        <p>{event.enrollmentCount}</p>
      </div>
      
        <Link href={`/events/${event.id}`} className={buttons.add_button}>See details</Link>
    </div>
  )
}

export default EventCard