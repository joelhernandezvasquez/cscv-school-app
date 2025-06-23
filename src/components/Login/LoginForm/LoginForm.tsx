'use client';
import { authenticateUser, signInUser } from '@/lib/actions/auth/login';
import { checkLoginFormErrors } from '@/lib/utils';
import { toast, Toaster } from 'sonner';
import style from './style.module.css';
import form from '../../../styles/forms.module.css';
import button from '../../../styles/buttons.module.css';


const LoginForm = () => {

  const handleAuthentication = async(event:React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const email  = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const {isError,message} = checkLoginFormErrors(email,password);

    if(isError){
      toast.error(message);
      return;
    }

    const result = await authenticateUser(email,password);
    console.log(result);
    
    if(result.error){
      toast.error(result.error);
      return;
    }

   await signInUser(email,password);
  }

  return (
    <form className={style.form_container} onSubmit={handleAuthentication}>
       <div className={form.form_field}>
         <label htmlFor='email'>Email Address</label>
         <div className={form.input_wrapper}>
          <span>@</span>
          <input type='email' name='email' id="email" placeholder='Enter email to get started' autoComplete="username"/>
         </div>
         
       </div>

       <div className={form.form_field}>
         <label htmlFor='password'>Password</label>
         <div className={form.input_wrapper}>
          <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
          <input type='password' name='password' id="password" placeholder="Enter your password" autoComplete='off'/>
         </div>
        
       </div>
         <Toaster position="top-center" richColors  closeButton  />
       <button type='submit' className={`${button.primary_btn} ${button.login_btn}`}>Log in</button>
    </form>
  )
}

export default LoginForm