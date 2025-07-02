
import DesktopMenu from '../Desktop-Menu/DesktopMenu';
import MobileMenu from '../Mobile-Menu/MobileMenu';
import style from './style.module.css';

const MainHeader = () => {

  return (
    <header className={style.main_header}>
      <MobileMenu/>
      <DesktopMenu/>
    </header>
  )
}

export default MainHeader