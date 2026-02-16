import { Suspense } from "react"
import { getDashboardEventsSummary } from "@/lib/actions/dashboard";
import DashboardMetrics from "@/components/Dashboard/Dashboard-Metrics/DashboardMetrics";
import DashboardEventsMetrics from "@/components/Dashboard/Dashboard-Events-Metrics/DashboardEventsMetrics";
import DashboardEventsAttention from "@/components/Dashboard/Dashboard-Events-Attention/DashboardEventsAttention";
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
     
      <DashboardEventsAttention dashboardEventSummary={dashboardEventsSummary}/>
    

    </main>
  )
}

export default DashboardPage