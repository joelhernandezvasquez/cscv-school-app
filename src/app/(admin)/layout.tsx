
import { auth} from "@/auth.config";
import { redirect } from "next/navigation";
import MainHeader from "@/components/MainHeader/MainHeader";
import Sidebar from "@/components/Sidebar/Sidebar";


export default async function AuthenticatedLayout({children}: Readonly<{children: React.ReactNode}>) 
{
    const session = await auth();

    if(!session?.user  || !session){
      redirect('/login');
    }
  
    return (
    <div className={'container'}>
      <Sidebar/>
      <MainHeader/>
      <div className={'main_content'}>
        {children}
      </div>
     
    </div>
  );
}