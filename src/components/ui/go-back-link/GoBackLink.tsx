'use client';

import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";
import style from './style.module.css';

const GoBackLink = () => {
     const router = useRouter();

     return (
      <button 
            className={style.go_back_btn} 
            onClick={() => router.back()}>
            Go Back 
            <IoIosArrowRoundBack size={25} /> 
       </button>
  )
}

export default GoBackLink