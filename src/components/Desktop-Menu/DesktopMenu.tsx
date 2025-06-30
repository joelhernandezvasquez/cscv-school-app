import { auth } from '@/auth.config';
import { getFirstLetterUpperCase } from '@/lib/utils';
import Avatar from '../ui/avatar/Avatar';
import CurrentRoute from '../ui/current-route/CurrentRoute';
import NotificationBtn from '../NotificationBtn/NotificationBtn';
import SettingButton from '../SettingBtn/SettingButton';
import style from './style.module.css';
import { SessionUser } from '@/types';

const DesktopMenu = async () => {
  const session = await auth() ;
  const userName = session?.user?.name as string;
  const role = getFirstLetterUpperCase((session?.user as SessionUser)?.role);
  
  return (
    <section className={style.desktop_menu}>
      <CurrentRoute/>
      <div className={style.group_desktop_menu_items}>
        <Avatar width={40} height={40} userName={userName} role={role}/>
        <NotificationBtn/>
        <SettingButton/>
      </div>
    </section>
  )
}

export default DesktopMenu