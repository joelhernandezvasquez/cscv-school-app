import { FaUser } from 'react-icons/fa';
import style from './style.module.css';

interface Props{
    width:number,
    height:number,
    userName:string,
    role:string
}

const Avatar = ({width,height,userName,role}:Props) => {
  return (
    <div className={style.avatar_container}>
      <div style={{width:width,height:height}} className={style.avatar}>
       <FaUser color='white' size={20}/> 
      </div>

       <div className={style.user_info}>
         <p className={style.user_name}>{userName}</p>
         <span className={style.user_role}>{role}</span>
        </div>
    </div>
    
  
  )
}

export default Avatar