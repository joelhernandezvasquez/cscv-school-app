import { Suspense } from "react";
import EventsMetrics from "@/components/Events/events-metrics/EventsMetrics";
import FilterEventTabs from "@/components/Events/filter-event-tabs/FilterEventTabs";
import util from '../../../styles/utils.module.css';
import style from './style.module.css';

const EventPage = async() => {
  return (
    <main className={util.wrapper}>
     <Suspense fallback="Loading...">
       <EventsMetrics/>
     </Suspense>
      <section className={`${util.card_container} ${style.events_container}`}>
       <header className={style.event_header}>
         <FilterEventTabs/>
         <button className={style.add_event_btn}>Add Event</button>
       </header> 
{/*        
       <Suspense key={query + currentPage} fallback={'Loading Table...'}>
        
       </Suspense> */}
      
     </section>

    </main>
  )
}

export default EventPage