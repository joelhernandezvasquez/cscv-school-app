'use client';
import { useTransition } from 'react';
import { authenticateUser, signInUser } from '@/lib/actions/auth/login';
import { checkLoginFormErrors } from '@/lib/utils';
import { toast, Toaster } from 'sonner';
import Spinner from '@/components/ui/spinner/Spinner';
import style from './style.module.css';
import form from '../../../styles/forms.module.css';
import button from '../../../styles/buttons.module.css';

interface Props{
  fontType:string
}

const LoginForm = ({fontType}:Props) => {
  
  const [isPending, startTransition] = useTransition();

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
    startTransition(async() =>{
    const result = await authenticateUser(email,password);
    
    if(result.error){
      toast.error(result.error);
      return;
    }

      await signInUser(email,password);
    })
  }

  return (
    <form className={style.form_container} onSubmit={handleAuthentication}>
       <div className={form.form_field}>
         <label className={`${form.bold_label} ${fontType}`} htmlFor='email'>Email Address</label>
         <div className={form.input_wrapper}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <input type='email' name='email' id="email" placeholder='Enter email to get started' autoComplete="username"/>
         </div>
         
       </div>

       <div className={form.form_field}>
         <label className={`${form.bold_label} ${fontType}`} htmlFor='password'>Password</label>
         <div className={form.input_wrapper}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <input type='password' name='password' id="password" placeholder="Enter your password" autoComplete='off'/>
         </div>
        
       </div>
         <Toaster position="top-center" richColors  closeButton  />
        <button 
          type='submit' 
          className={`${button.primary_btn} ${button.btn_login} ${fontType}`}
          >
            {!isPending ? 'Log in' : <Spinner text='Signing in…'/> }
             
          </button>
    </form>
  )
}

export default LoginForm