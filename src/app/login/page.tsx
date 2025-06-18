import Image from 'next/image';
import style from './style.module.css';

const LoginPage = () => {
  return (
    <section className={style.wrapper}>
     
     <div className={style.logo}>
       <Image
        src={"/logo.jpg"}
        width={50}
        height={50}
        alt=""
       />
       <span className={style.academy_text}>CSCV Academy</span>
     </div>
     
     <h1>Sign in to CSCV Academy</h1>

    </section>
  )
}

export default LoginPage