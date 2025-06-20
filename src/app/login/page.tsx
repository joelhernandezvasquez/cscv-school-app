import Logo from '@/components/ui/logo/Logo';
import LoginForm from '@/components/Login/LoginForm/LoginForm';
import style from './style.module.css';

const LoginPage = () => {
  return (
    <section className={style.wrapper}>
     
     <div className={style.logo}>
       <Logo width={45} height={45}/>
       <span className={style.academy_text}>CSCV Academy</span>
     </div>
     
     <h1 className={style.main_headline}>Sign in to CSCV Academy</h1>
     <LoginForm/>
    </section>
  )
}

export default LoginPage