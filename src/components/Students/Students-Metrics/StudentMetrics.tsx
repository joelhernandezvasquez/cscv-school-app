import { getStudentSummary } from '@/lib/actions/students';
import StatsMetric from '@/components/ui/stats-metric/StatsMetric';
import util from '../../../styles/utils.module.css';
import style from './style.module.css';

const StudentMetrics = async() => {

  const {total,active,inactive}= await getStudentSummary();

   const staticsMetricsItems = [
    {
           id:1,
           background:'#F5F5F5',
           stats:'Total Students',
           amount:total,
           icon:'/assets/GraduationCap.svg',
           iconBackground:'#E2E2E3'
    },
    {
           id:2,     
           background:'#5655D7',
           stats:'Active Students',
           amount:active,
           icon:'/assets/GraduationCap.svg',
           textColor:'#FFF',
           iconBackground:'#FFF'
    },
    {        id:3,
              background:'#F5F8FF', 
              stats:'Inactive Students', 
              amount:inactive, 
              icon:'/assets/GraduationCap.svg',
              iconBackground:'#CDDEFF'
    }
  ];
  return (
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
  )
}

export default StudentMetrics