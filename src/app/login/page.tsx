import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import { DM_Serif_Display } from 'next/font/google';
import Logo from '@/components/ui/logo/Logo';
import LoginForm from '@/components/Login/LoginForm/LoginForm';
import style from './style.module.css';

const DMSerifDisplay = DM_Serif_Display({
  weight: "400",
  variable:"--font-dm-serif-display",
  subsets:["latin"]
});

const LoginPage = async() => {

      const session = await auth() ;
  
      if( session && session?.user){
        redirect('/dashboard');
      }
  
  return (
    <>
      <section className={style.wrapper}>
        <div className={style.logo}>
          <Logo width={45} height={45}/>
          <span className={style.academy_text}>CSCV Academy</span>
        </div>
      
        <h1 className={`${style.main_headline} ${DMSerifDisplay.className}`}>
          Welcome back.
        </h1>
        <LoginForm fontType={DMSerifDisplay.className}/>
        
        <p className={`${style.footer_note}`}>
          By signing in you agree to our <a href="#">Terms</a> & <a href="#">Privacy Policy</a>
         </p>
      </section>
    </>
  )
}

export default LoginPage