import { Suspense } from "react"
import DashboardMetrics from "@/components/Dashboard/Dashboard-Metrics/DashboardMetrics";
import DashboardEventsMetrics from "@/components/Dashboard/Dashboard-Events-Metrics/DashboardEventsMetrics";
import DashboardEventsAttention from "@/components/Dashboard/Dashboard-Events-Attention/DashboardEventsAttention";
import util from '../../../styles/utils.module.css';

const DashboardPage = async () => {
  return (
     <main className={util.wrapper}>
     <Suspense fallback="Loading...">
        <DashboardMetrics/>
     </Suspense>

     <Suspense fallback="Loading...">
       <DashboardEventsMetrics/>
     </Suspense>
     
      <DashboardEventsAttention/>
    

    </main>
  )
}

export default DashboardPage