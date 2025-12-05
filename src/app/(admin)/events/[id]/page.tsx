import { redirect } from "next/navigation";
import { getEvent } from "@/lib/actions/events";
import EditEventButton from "@/components/Events/edit-event-btn/EditEventButton";
import EventDetailInfo from "@/components/Events/event-detail-info/EventDetailInfo";
import style from '../style.module.css';
import util from '../../../../styles/utils.module.css';
import EventEnrollmentTable from "@/components/Events/event-enrollment-table/EventEnrollmentTable";
interface EventDetailPageProps {
  params: { id: string }
}

const EventDetailPage = async ({ params }: EventDetailPageProps) => {
    const {id} = await params;
    const event = await getEvent(id);
  
    if(event.error){
     redirect('/events');
    }

  return (
   <main className={util.wrapper}>
    <section className={util.card_container}>
      <header className={`${util.flex} ${util.flex_center_space_between}`}>
        <h2 className='title'>{event.name}</h2>
        <EditEventButton/>
      </header>
      
      <div className={style.event_body}>
        <EventDetailInfo event={event}/>
        <EventEnrollmentTable/>
      
      </div>
    
    </section>
   </main>
  )
}

export default EventDetailPage