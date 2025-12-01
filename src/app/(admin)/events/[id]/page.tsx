import { redirect } from "next/navigation";
import { getEvent } from "@/lib/actions/events";

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
    <div>
        <h2>Event Detail page</h2>
    </div>
  )
}

export default EventDetailPage