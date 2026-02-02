import { Suspense } from "react";
import EventsMetrics from "@/components/Events/events-metrics/EventsMetrics";
import FilterEventTabs from "@/components/Events/filter-event-tabs/FilterEventTabs";
import EventsGridContainer from "@/components/Events/events-grid-container/EventsGridContainer";
import PaginationContainer from "@/components/ui/pagination/PaginationContainer";
import { getEventsPagination } from "@/lib/actions/events";
import AddEventButton from "@/components/Events/add-event-btn/AddEventButton";
import EventCourseDropdownWrapper from "@/components/Events/event-course-dropdown/EventCourseDropdownWrapper";
import util from '../../../styles/utils.module.css';
import style from './style.module.css';

export default async function EventPage (props:{
   searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?:string
  }>;
}) {

  const searchParams = await(props.searchParams);
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const pagination = await getEventsPagination(query,currentPage);


  return (
    <main className={util.wrapper}>
     <Suspense fallback="Loading...">
       <EventsMetrics/>
     </Suspense>
      <section className={`${util.card_container} ${style.events_container}`}>
       <header className={style.event_header}>
         <FilterEventTabs/>
         <AddEventButton>
           <EventCourseDropdownWrapper/>
         </AddEventButton>
       </header> 
     </section>

     <Suspense key={query + currentPage} fallback={'Loading Events...'}>
        <EventsGridContainer
         query={query}
         currentPage={currentPage}
        />
    </Suspense> 

      <PaginationContainer 
        currentPage={currentPage} 
        query={query}
        pagination={pagination}
      />

    </main>
  )
}