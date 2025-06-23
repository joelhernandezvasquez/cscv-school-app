import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import {UserSession} from '../../../types/index';

const DashboardPage = async () => {

    const session: UserSession = await auth() ;

    if(!session?.user){
      redirect('/login');
    }

  return (
    <h1>This is the dashboard page</h1>
  )
}

export default DashboardPage