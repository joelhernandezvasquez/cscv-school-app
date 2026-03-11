import { ReactNode } from "react";
import Image from "next/image";
import style from './style.module.css';

interface Props{
  background:string,
  stats:string,
  amount:number,
  textColor?:string,
  icon:ReactNode| string,
  iconBackground:string
}

const StatsMetric = ({background,stats,amount,textColor,icon,iconBackground}:Props) => {
  return (
    <div style={{backgroundColor:background}} className={style.stats_container}>
      
      <div style={{backgroundColor:iconBackground}} className={style.icon_container}>
        {
          typeof icon === 'string' ? 
          (
            <Image
              width={25}
              height={25}
              src={icon as string}
              alt=""
              />
          )
          :icon
        }
      </div>

      <div className={style.main_info}>
        <h2 style={{color:textColor ?? "#11141A"}}>{stats}</h2>
        <p style={{color:textColor ?? "#11141A"}}>{amount}</p>
      </div>
    </div>
  )
}

export default StatsMetric