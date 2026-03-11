import { ReactNode } from 'react';
import style from './style.module.css';
import util from '../../../styles/utils.module.css';

interface Props{
    icon:ReactNode,
    title:string,
    metric:number,
    infoText:string
}

const BlockMetric = ({icon,title,metric,infoText}:Props) => {
  return (
    <div className={style.block}>
         <div className={style.block_header}>
            {icon}
            <h3>{title}</h3>
         </div>
        
         <div className={style.block_body}>
           <p className={style.block_metric}>{metric}</p>
           <p className={style.info_text}>{infoText}</p>
         </div>
    </div>
  )
}

export default BlockMetric