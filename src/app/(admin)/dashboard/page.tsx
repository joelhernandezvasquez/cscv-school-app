import { Suspense } from "react"
import util from '../../../styles/utils.module.css';
import DashboardMetrics from "@/components/Dashboard/Dashboard-Metrics/DashboardMetrics";
const DashboardPage = async () => {
  return (
     <main className={util.wrapper}>
     <Suspense fallback="Loading...">
        <DashboardMetrics/>
     </Suspense>

    

    </main>
  )
}

export default DashboardPage