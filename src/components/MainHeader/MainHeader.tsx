
import CurrentRoute from '../ui/current-route/CurrentRoute';
import Logo from '../ui/logo/Logo';
import { ToggleMenu } from '../ui/toggle-menu/ToggleMenu';
import style from './style.module.css';

const MainHeader = () => {

  return (
    <header className={style.main_header}>
      <Logo width={45} height={45}/>
      <CurrentRoute/>
      <ToggleMenu/>
    </header>
  )
}

export default MainHeader