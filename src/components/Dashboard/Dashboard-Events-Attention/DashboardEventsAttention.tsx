
import Link from 'next/link';
import DashboardAttentionCard from '../Dashboard-Attention-Card/DashboardAttentionCard';
import { getDiffDays } from '@/lib/utils';
import { DashboardEventSummary } from '@/types';
import { CiWarning } from 'react-icons/ci';
import { IoIosCheckboxOutline } from 'react-icons/io';
import style from '../dashboard.module.css';
import button from '../../../styles/buttons.module.css';
import util from '../../../styles/utils.module.css';
interface Props{
  dashboardEventSummary:DashboardEventSummary
}

const DashboardEventsAttention = ({dashboardEventSummary}:Props) => {

  const {upcomingEvents,activeEvents,pendingCompletionEvents} = dashboardEventSummary;

  return (
    <section className={style.dashboard_events_metric_container}>
        <p className="sub_title">Needs Your Attention</p>

        <ul className={style.dashboard_metrics_grid}>
          {pendingCompletionEvents.events.map((event)=>{
            return <li key={event.id}>
                     <DashboardAttentionCard
                      status='ended'
                      statusTime={`${getDiffDays(event.start_date)} days ago`}
                      eventName={event.name}
                   >
                      <div className={`${util.flex} ${util.flex_center} ${util.gap_5}`}>
                        <CiWarning size={25} color={'#eb892b'}/>
                      <p>
                        <span className={style.bold_passed_event}>Event ended </span>
                        ready to be completed
                      </p>
                      </div>
                   
                      <div className={style.event_button}>
                        <Link className={button.add_button} href={`/events/${event.id}`}> Complete Event</Link>
                      </div>
                  
                </DashboardAttentionCard>
                   </li>
          })}
           
           {activeEvents.events.map((event)=>{
           return <li key={event.id}>
                    <DashboardAttentionCard
                      status='active'
                      eventName={event.name}
                      >
                      <div className={`${util.flex} ${util.flex_center} ${util.gap_5}`}>
                        <IoIosCheckboxOutline size={25} color={'#60a18f'}/>
                      <p>
                        Review Enrollments
                      </p>
                      </div>
                      
                      <div className={style.event_button}>
                        <Link className={button.add_button} href={`/events/${event.id}`}>Manage Enrollment</Link>
                      </div>
                  
                </DashboardAttentionCard>
                  </li>
           })}

           {upcomingEvents.events.map((event)=>{
            return <li key={event.id}>
                     <DashboardAttentionCard
                      status='upcoming'
                      statusTime={`${getDiffDays(event.start_date)} days`}
                      eventName={event.name}
                      >
                        <div className={`${util.flex} ${util.flex_center} ${util.gap_5}`}>
                          <IoIosCheckboxOutline size={25} color={'#486fdd'}/>
                        <p>
                          Add Students to fill seats
                        </p>
                        </div>
                        
                        <div className={style.event_button}>
                          <Link className={button.add_button} href={`/events/${event.id}`}>Enroll Students</Link>
                        </div>
                        
                     </DashboardAttentionCard>
                   </li>
           })}
         </ul>
        
    </section>
  )
}

export default DashboardEventsAttention