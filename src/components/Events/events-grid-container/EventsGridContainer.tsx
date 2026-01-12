import { getEvents } from "@/lib/actions/events"
import EventCard from "../event-card/EventCard";
import style from './style.module.css';

interface Props{
    query:string,
    currentPage:number
}
const EventsGridContainer = async({query,currentPage}:Props) => {
 const events = await getEvents(query,currentPage);
 console.log(events);

  return (
    <ul className={style.events_grid}>
        {events.map((event)=>{
            return <li key={event.id}>
                  <EventCard event={event}/>
            </li>
        })}
    </ul>
  )
}

export default EventsGridContainer