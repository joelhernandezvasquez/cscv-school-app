import { auth } from "@/auth.config";
import {UserSession} from '../../../types/index';

const DashboardPage = async () => {

    const session: UserSession = await auth() ;

    console.log(session?.user.token);

  return (
    <h1>This is the dashboard page</h1>
  )
}

export default DashboardPage