'use client';
import { signOut } from 'next-auth/react';
import button from '../../../styles/buttons.module.css';

const SignOutBtn = () => {
  
  const handleSignOut = () =>{
    signOut();
  }

  return (
    <button className={button.sign_out_btn} onClick={handleSignOut}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M14.467 6.90449C14.7355 6.636 15.1708 6.636 15.4393 6.90449L19.0486 10.5139C19.3171 10.7823 19.3171 11.2177 19.0486 11.4861L15.4393 15.0955C15.1708 15.364 14.7355 15.364 14.467 15.0955C14.1985 14.827 14.1985 14.3917 14.467 14.1232L17.5902 11L14.467 7.87676C14.1985 7.60828 14.1985 7.17297 14.467 6.90449Z" fill="#797B7E"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.25 11C8.25 10.6203 8.5578 10.3125 8.9375 10.3125H18.5625C18.9422 10.3125 19.25 10.6203 19.25 11C19.25 11.3797 18.9422 11.6875 18.5625 11.6875H8.9375C8.5578 11.6875 8.25 11.3797 8.25 11Z" fill="#797B7E"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.15273 3.15273C3.41059 2.89487 3.76033 2.75 4.125 2.75H8.9375C9.3172 2.75 9.625 3.0578 9.625 3.4375C9.625 3.8172 9.3172 4.125 8.9375 4.125L4.125 4.125L4.125 17.875H8.9375C9.3172 17.875 9.625 18.1828 9.625 18.5625C9.625 18.9422 9.3172 19.25 8.9375 19.25H4.125C3.76033 19.25 3.41059 19.1051 3.15273 18.8473C2.89487 18.5894 2.75 18.2397 2.75 17.875V4.125C2.75 3.76033 2.89487 3.41059 3.15273 3.15273Z" fill="#797B7E"/>
        </svg>
        <span>Sign Out</span>
    </button>
  )
}

export default SignOutBtn