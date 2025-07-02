import { auth } from '@/auth.config';
import { SessionUser } from '@/types';
import Avatar from '../ui/avatar/Avatar';
import CurrentRoute from '../ui/current-route/CurrentRoute';
import NotificationBtn from '../NotificationBtn/NotificationBtn';
import SettingButton from '../SettingBtn/SettingButton';
import { getFirstLetterUpperCase, getOnlyUserName } from '@/lib/utils';
import style from './style.module.css';

const DesktopMenu = async () => {
  const session = await auth() ;
  const userName = session?.user?.name as string;
  const firstNameUser = getOnlyUserName(userName);
  const role = getFirstLetterUpperCase((session?.user as SessionUser)?.role);
 
  return (
    <section className={style.desktop_menu}>
      <div>
        <CurrentRoute/>
        <p>Hello {firstNameUser}, welcome back!</p>
      </div>

      <div className={style.group_desktop_menu_items}>
        <Avatar width={40} height={40} userName={userName} role={role}/>
        <NotificationBtn/>
        <SettingButton/>
      </div>
    </section>
  )
}

export default DesktopMenu