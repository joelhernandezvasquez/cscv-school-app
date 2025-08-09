import style from './style.module.css';

interface Props{
    status:'Active' | 'Inactive'
}
const Badge = ({status}:Props) => {
  return (
   <>
     <div className={style.badge_mobile}>
       <span className={`${style.badge_indicator} ${status === 'Active' ? style.active_badge : style.inactive_badge}`}></span>
       <p>{status}</p>
     </div>

     <div className={`${style.badge_desktop} ${status === 'Active' ? style.active_badge : style.inactive_badge}`}>
       <p>{status}</p>
    </div>


   </>

    
  )
}

export default Badge