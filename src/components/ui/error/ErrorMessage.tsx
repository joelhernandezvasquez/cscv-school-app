import style from './style.module.css';

interface Props{
    message:string
}

const ErrorMessage = ({message}:Props) => {
  return (
    <p className={style.error}>{message}</p>
  )
}

export default ErrorMessage