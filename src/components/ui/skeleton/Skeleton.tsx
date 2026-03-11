import style from './style.module.css';

interface Props{
    className:string
}
const Skeleton = ({className}:Props) => {
  return (
    <div className={`${style.skeleton} ${className}`} />
  )
}

export default Skeleton