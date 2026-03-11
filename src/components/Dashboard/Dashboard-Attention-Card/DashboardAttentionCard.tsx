import { ReactNode } from 'react';
import util from '../../../styles/utils.module.css';
import style from './style.module.css';

interface Props{
    status:'ended' | 'upcoming' | 'active',
    statusTime?:string,
    eventName:string,
    children:ReactNode
}

const DashboardAttentionCard = ({status,statusTime,eventName,children}:Props) => {
  return (
    <article className={`${util.card_container} ${style.card}`}>
       <header className={style.card_header}>
         <div className={`${style.card_header_pill} ${style[status]}`}>{status}</div>
         { statusTime &&  <p className={`${style.status_time} ${style[status]}`}>{statusTime}</p>}
       </header>
       <div className={style.card_body}>
        <p className={style.card_body_event_name}>{eventName}</p>
        <div className={style.card_body_event_info}>
         {children}
        </div>
       </div>
    </article>
  )
}

export default DashboardAttentionCard