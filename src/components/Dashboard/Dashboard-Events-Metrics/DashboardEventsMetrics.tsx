import BlockMetric from '@/components/ui/block-metric/BlockMetric';
import { LiaCalendar } from 'react-icons/lia';
import { FaDisplay } from 'react-icons/fa6';
import { CiCalendar, CiWarning } from 'react-icons/ci';
import style from './style.module.css';
import { MdOutlineAirplay } from 'react-icons/md';

const DashboardEventsMetrics = () => {
  return (
    <section className={style.dashboard_events_metric_container}>
      <p className="sub_title">Overview of Events</p>
      
      <ul className={style.dashboard_metrics_grid}>
        <li> 
          <BlockMetric 
            icon={<CiCalendar size={35} color={'#2a4de5'}/>} 
            title={'Upcoming Events'} 
            metric={5} 
            infoText={'Next 7 Days'}
          />
        </li>

         <li> 
          <BlockMetric 
            icon={<MdOutlineAirplay size={35} color={'#249a67'}/>} 
            title={'Active Events'} 
            metric={3} 
            infoText={'Currently Running'}
          />
        </li>

         <li> 
          <BlockMetric 
            icon={<CiWarning size={35} color={'#ecb00ac4'}/>} 
            title={'Pending Completions'} 
            metric={4} 
            infoText={'Needs Attention'}
          />
        </li>
      </ul>

     
     
    </section>
  )
}

export default DashboardEventsMetrics