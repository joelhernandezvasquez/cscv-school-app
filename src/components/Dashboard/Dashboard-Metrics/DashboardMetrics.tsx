import StatsMetric from '@/components/ui/stats-metric/StatsMetric';
import { getDashboardSummary } from '@/lib/actions/dashboard';
import util from '../../../styles/utils.module.css';
import style from '../dashboard.module.css';


const DashboardMetrics = async() => {
const {totalStudents,totalEnrollments,totalEvents}= await getDashboardSummary();

  const staticsMetricsItems = [
    {
           id:1,
           background:'#F5F5F5',
           stats:'Total Students',
           amount:totalStudents,
           icon:'/assets/GraduationCap.svg',
           iconBackground:'#E2E2E3'
    },
    {
           id:2,     
           background:'#5655D7',
           stats:'Total Enrollments',
           amount:totalEnrollments,
           icon:'/assets/GraduationCap.svg',
           textColor:'#FFF',
           iconBackground:'#FFF'
    },
    {        id:3,
              background:'#F5F8FF', 
              stats:'Total Events', 
              amount:totalEvents, 
              icon:'/assets/GraduationCap.svg',
              iconBackground:'#CDDEFF'
    }
  ];
  return (
    <div>
    <section className={util.card_container}>
      <ul className={style.metrics_menu}>
       {
        staticsMetricsItems.map((statics)=>{
          return <li key={statics.id}>{
             <StatsMetric
              background={statics.background} 
              stats={statics.stats} 
              amount={statics.amount} 
              textColor={statics.textColor ?? ''}
              icon={statics.icon}
              iconBackground={statics.iconBackground} 
        />  
          }
          </li>
        })
       }
      </ul>

    </section>
  </div>
  )
}

export default DashboardMetrics