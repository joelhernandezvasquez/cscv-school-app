import { DashboardEventSummary } from '@/types';
import BlockMetric from '@/components/ui/block-metric/BlockMetric';
import { MdOutlineAirplay } from 'react-icons/md';
import { CiCalendar, CiWarning } from 'react-icons/ci';
import style from '../dashboard.module.css';

interface Props{
  dashboardEventSummary:DashboardEventSummary
}

const DashboardEventsMetrics = ({dashboardEventSummary}:Props) => {
   const {upcomingEvents,activeEvents,pendingCompletionEvents} = dashboardEventSummary;
    
  return (
    <section className={style.dashboard_events_metric_container}>
      <p className="sub_title">Overview of Events</p>
      
      <ul className={style.dashboard_metrics_grid}>
        <li> 
          <BlockMetric 
            icon={<CiCalendar size={35} color={'#2a4de5'}/>} 
            title={'Upcoming Events'} 
            metric={upcomingEvents.amount} 
            infoText={`Next ${upcomingEvents.nextEventInDays} Days`}
          />
        </li>

         <li> 
          <BlockMetric 
            icon={<MdOutlineAirplay size={35} color={'#249a67'}/>} 
            title={'Active Events'} 
            metric={activeEvents.amount} 
            infoText={'Currently Running'}
          />
        </li>

         <li> 
          <BlockMetric 
            icon={<CiWarning size={35} color={'#ecb00ac4'}/>} 
            title={'Pending Completions'} 
            metric={pendingCompletionEvents.amount} 
            infoText={'Needs Attention'}
          />
        </li>
      </ul>

    </section>
  )
}

export default DashboardEventsMetrics