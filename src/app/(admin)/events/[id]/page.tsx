import { redirect } from "next/navigation";
import { getEvent } from "@/lib/actions/events";
import EditEventButton from "@/components/Events/edit-event-btn/EditEventButton";
import util from '../../../../styles/utils.module.css';

interface EventDetailPageProps {
  params: { id: string }
}

const EventDetailPage = async ({ params }: EventDetailPageProps) => {
    const {id} = await params;
    const event = await getEvent(id);
    console.log(event);
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
    </section>
   </main>
  )
}

export default EventDetailPage