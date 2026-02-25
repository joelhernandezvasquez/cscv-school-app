import { Suspense } from "react"
import { getDashboardEventsSummary } from "@/lib/actions/dashboard";
import DashboardMetrics from "@/components/Dashboard/Dashboard-Metrics/DashboardMetrics";
import DashboardEventsMetrics from "@/components/Dashboard/Dashboard-Events-Metrics/DashboardEventsMetrics";
import DashboardEventsAttention from "@/components/Dashboard/Dashboard-Events-Attention/DashboardEventsAttention";
import DashboardStudentsRisk from "@/components/Dashboard/Dashboard-Students-Risk/DashboardStudentsRisk";
import GridStatSkeleton from "@/components/ui/grid-stat-skeleton/GridStatSkeleton";
import util from '../../../styles/utils.module.css';

const DashboardPage = async () => {
  const dashboardEventsSummary = await getDashboardEventsSummary();
  
  return (
     <main className={util.wrapper}>
     <Suspense fallback= {<GridStatSkeleton/>}>
        <DashboardMetrics/>
     </Suspense>

     <Suspense fallback={<GridStatSkeleton/>}>
       <DashboardEventsMetrics dashboardEventSummary={dashboardEventsSummary}/>
     </Suspense>
     
   <Suspense fallback={<GridStatSkeleton/>}>
        <DashboardEventsAttention dashboardEventSummary={dashboardEventsSummary}/>
     </Suspense>
    
      <Suspense fallback={<GridStatSkeleton/>}>
         <DashboardStudentsRisk/>
      </Suspense>
     
    </main>
  )
}

export default DashboardPage