import Navigation from '../Navigation/Navigation';
import Logo from '../ui/logo/Logo';
import style from './style.module.css';

const Sidebar = () => {
  return (
    <section className={style.sidebar_container}>
        <Logo width={65} height={65}/>
        <div className={style.divider}></div>
        <Navigation/>
    </section>
  )
}

export default Sidebar