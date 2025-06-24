import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

const DashboardPage = async () => {

    const session = await auth() ;

    if(!session?.user || !session){
      redirect('/login');
    }

  return (
    <h1>This is the dashboard page</h1>
  )
}

export default DashboardPage