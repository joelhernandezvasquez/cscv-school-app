import style from './style.module.css';

interface Props{
    status:'Active' | 'Inactive'
}
const Badge = ({status}:Props) => {
  return (
    <div className={`${style.badge} ${status === 'Active' ? style.active_badge : style.inactive_badge}`}>
       <p>{status}</p>
    </div>
  )
}

export default Badge