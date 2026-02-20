import { Suspense } from "react"
import { getDashboardEventsSummary } from "@/lib/actions/dashboard";
import DashboardMetrics from "@/components/Dashboard/Dashboard-Metrics/DashboardMetrics";
import DashboardEventsMetrics from "@/components/Dashboard/Dashboard-Events-Metrics/DashboardEventsMetrics";
import DashboardEventsAttention from "@/components/Dashboard/Dashboard-Events-Attention/DashboardEventsAttention";
import DashboardStudentsRisk from "@/components/Dashboard/Dashboard-Students-Risk/DashboardStudentsRisk";
import util from '../../../styles/utils.module.css';

const DashboardPage = async () => {
  const dashboardEventsSummary = await getDashboardEventsSummary();
  
  return (
     <main className={util.wrapper}>
     <Suspense fallback="Loading...">
        <DashboardMetrics/>
     </Suspense>

     <Suspense fallback="Loading...">
       <DashboardEventsMetrics dashboardEventSummary={dashboardEventsSummary}/>
     </Suspense>
     
     <Suspense fallback="Loading...">
        <DashboardEventsAttention dashboardEventSummary={dashboardEventsSummary}/>
     </Suspense>
    
      <Suspense fallback="Loading...">
         <DashboardStudentsRisk/>
      </Suspense>
     
    </main>
  )
}

export default DashboardPage