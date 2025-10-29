import { Suspense } from "react";
import EventsMetrics from "@/components/Events/events-metrics/EventsMetrics";
import util from '../../../styles/utils.module.css';

const EventPage = async() => {
  return (
    <main className={util.wrapper}>
     <Suspense fallback="Loading...">
       <EventsMetrics/>
     </Suspense>

    </main>
  )
}

export default EventPage