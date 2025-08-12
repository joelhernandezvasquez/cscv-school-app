'use client';
import { ReactNode } from 'react';
import UseClickAway from '@/hooks/UseClickAway';
import UseToggle from '@/hooks/UseToggle';
import style from './style.module.css';
interface Props{
  children:ReactNode
}

const ActionButton = ({children}:Props) => {
  const {isToggle,handleToggle} = UseToggle();
  const actionRef = UseClickAway(handleToggle);

  return (
    <div className={style.container_action}>
    <button className={style.action_btn} onClick={handleToggle}>
      <svg  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
     </svg>
    </button>
    
    {isToggle &&
     <div ref={actionRef}>
       {children}
      </div>
  
  }

    </div>
  )
}

export default ActionButton