import CurrentRoute from "../ui/current-route/CurrentRoute";
import Logo from "../ui/logo/Logo";
import { ToggleMenu } from "../ui/toggle-menu/ToggleMenu";
import style from './style.module.css';

const MobileMenu = () => {
  return (
    <div className={style.mobile_menu}>
      <Logo width={45} height={45}/>
      <CurrentRoute/>
      <ToggleMenu/>
    </div>
      
  )
}

export default MobileMenu