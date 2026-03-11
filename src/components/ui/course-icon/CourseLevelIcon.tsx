import Image from 'next/image';
import style from './style.module.css';

interface Props{
    level:string,
    width?:number,
    height?:number
}

const CourseLevelIcon = ({level,width,height}:Props) => {

  return (
    <div style={{width:width,height}} className={`${style.course_item_icon} ${style[level]}`}>
      <Image
        width={24}
        height={24}
        alt=""
        src={`/assets/${level}.svg`}
        />
    </div>
  )
}

export default CourseLevelIcon