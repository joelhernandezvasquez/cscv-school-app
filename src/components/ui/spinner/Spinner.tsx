import style from './style.module.css';

interface Props{
  text:string
}

const Spinner = ({text}:Props) => {
  return (
    <div className={style.spinner_container}>
      <span>{text}</span>
      <span className={style.spinner}></span>
    </div>
   
  )
}

export default Spinner