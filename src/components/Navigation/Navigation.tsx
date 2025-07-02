'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { RxDashboard } from 'react-icons/rx';
import { PiCalendarBlank, PiStudent } from 'react-icons/pi';
import { LuUserCheck } from 'react-icons/lu';
import { SiGoogleclassroom } from 'react-icons/si';
import style from './style.module.css';

export const navigationItems = [
    {
        id:'001-dashboard',
        item:'Dashboard',
        url:'/dashboard',
        icon:<RxDashboard size={24} />
    },
    {
        id:'002-students',
        item:'Students',
        url:'/students',
        icon:<PiStudent size={24} />
    },
    {
        id:'003-events',
        item:'Events',
        url:'/events',
        icon:<PiCalendarBlank size={24} />
    },
    {
        id:'004-enroll',
        item:'Enrollment',
        url:'/enrollment',
        icon:<LuUserCheck size={24} />
    },
    {
        id:'005-courses',
        item:'Courses',
        url:'/courses',
        icon:<SiGoogleclassroom size={24} />
    }
]

interface Props{
  closeMenu? : () => void
}
const Navigation = ({closeMenu}:Props) => {

  const pathName = usePathname();

  const handleOnClick = (currentUrl:string) =>{
    if(pathName!==currentUrl){
      
      if(closeMenu){
        closeMenu();
      }
     
    }
  }

  return (
    <nav className={style.nav}>
     <ul className={style.nav_list}>
      {navigationItems.map((navItem)=>{
        return(
        <li className={`${style.nav_item} ${pathName === navItem.url && style.active_link}`} key={navItem.id} onClick={() => handleOnClick(navItem.url)}>
          <Link className={style.nav_link} href={navItem.url}> 
           {navItem.icon}
           {navItem.item}
          </Link>
        </li>
        )
      })}
     </ul>
    </nav>
  )
}

export default Navigation