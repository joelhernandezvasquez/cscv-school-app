import { Suspense } from "react";
import EventsMetrics from "@/components/Events/events-metrics/EventsMetrics";
import FilterEventTabs from "@/components/Events/filter-event-tabs/FilterEventTabs";
import util from '../../../styles/utils.module.css';
import style from './style.module.css';
import EventsGridContainer from "@/components/Events/events-grid-container/EventsGridContainer";

export default async function EventPage (props:{
   searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?:string
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;


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
     </section>

     <Suspense key={query + currentPage} fallback={'Loading Events...'}>
        <EventsGridContainer
         query={query}
         currentPage={currentPage}
        />
    </Suspense> 

    </main>
  )
}