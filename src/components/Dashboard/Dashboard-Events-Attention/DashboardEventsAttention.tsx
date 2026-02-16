
import Link from 'next/link';
import { CiWarning } from 'react-icons/ci';
import DashboardAttentionCard from '../Dashboard-Attention-Card/DashboardAttentionCard';
import style from '../dashboard.module.css';
import button from '../../../styles/buttons.module.css';
import util from '../../../styles/utils.module.css';
import { IoIosCheckboxOutline } from 'react-icons/io';

const DashboardEventsAttention = () => {
  return (
    <section className={style.dashboard_events_metric_container}>
        <p className="sub_title">Needs Your Attention</p>

        <ul className={style.dashboard_metrics_grid}>
            <li>
                <DashboardAttentionCard
                 status='ended'
                 statusTime={`${2} days ago`}
                 eventName='Sanacion Interior Mujer'
                >
                  <div className={`${util.flex} ${util.flex_center} ${util.gap_5}`}>
                     <CiWarning size={25} color={'#eb892b'}/>
                   <p>
                    <span className={style.bold_passed_event}>Event ended </span>
                     ready to be completed
                  </p>
                  </div>
                   
                  <div className={style.event_button}>
                    <Link className={button.add_button} href={`/events/${53}`}> Complete Event</Link>
                  </div>
                  
                </DashboardAttentionCard>
            </li>

             <li>
                <DashboardAttentionCard
                 status='ended'
                 statusTime={`${5} days ago`}
                 eventName='Curso Felipe'
                >
                  <div className={`${util.flex} ${util.flex_center} ${util.gap_5}`}>
                     <CiWarning size={25} color={'#eb892b'}/>
                   <p>
                    <span className={style.bold_passed_event}>Event ended </span>
                     ready to be completed
                  </p>
                  </div>
                   
                  <div className={style.event_button}>
                    <Link className={button.add_button} href={`/events/${53}`}> Complete Event</Link>
                  </div>
                  
                </DashboardAttentionCard>
            </li>

            <li>
                <DashboardAttentionCard
                 status='active'
                 eventName='Curso Pedro'
                >
                  <div className={`${util.flex} ${util.flex_center} ${util.gap_5}`}>
                     <IoIosCheckboxOutline size={25} color={'#60a18f'}/>
                   <p>
                    Review Enrollments
                  </p>
                  </div>
                   
                  <div className={style.event_button}>
                    <Link className={button.add_button} href={`/events/${58}`}>Manage Enrollment</Link>
                  </div>
                  
                </DashboardAttentionCard>
            </li>

             <li>
                <DashboardAttentionCard
                 status='upcoming'
                 statusTime={`${4} days`}
                 eventName='Curso Discipulo De Cristo'
                >
                  <div className={`${util.flex} ${util.flex_center} ${util.gap_5}`}>
                     <IoIosCheckboxOutline size={25} color={'#486fdd'}/>
                   <p>
                    Add Students to fill seats
                  </p>
                  </div>
                   
                  <div className={style.event_button}>
                    <Link className={button.add_button} href={`/events/${9}`}>Enroll Students</Link>
                  </div>
                  
                </DashboardAttentionCard>
            </li>
        </ul>
    </section>
  )
}

export default DashboardEventsAttention