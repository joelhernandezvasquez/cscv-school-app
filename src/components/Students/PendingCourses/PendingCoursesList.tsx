import style from './style.module.css';
import util from '../../../styles/utils.module.css';
import Image from 'next/image';


const PendingCoursesList = () => {
  return (
    <section className={`${style.pending_course_container} ${util.card_container}`}>
       <h2 className='title'>Pending Courses</h2>
       <div className={style.inner_course_container}>
       <ul className={style.course_list}>
        
        <li className={style.course_item}>
           <div className={`${style.course_item_icon} ${style.level1}`}>
            <Image
             width={24}
             height={24}
             alt=""
             src={`/assets/${'level1'}.svg`}
            />
           </div>

           <div className={style.course_item_info}>
              <p className={style.course_item_info_name}>Jose</p>
              <p className={style.course_item_info_description}>Sanación etapas de evangelizador</p>
           </div>

           <div className={`${style.course_item_level} ${style.level1}`}>
             <span>Nivel 1</span>
           </div>

        </li>

        <li className={style.course_item}>
           <div className={`${style.course_item_icon} ${style.level2}`}>
            <Image
             width={24}
             height={24}
             alt=""
             src={`/assets/${'level2'}.svg`}
            />
           </div>

           <div className={style.course_item_info}>
              <p className={style.course_item_info_name}>Esteban</p>
              <p className={style.course_item_info_description}>Formacion de testigos</p>
           </div>

           <div className={`${style.course_item_level} ${style.level2}`}>
             <span>Nivel 2</span>
           </div>

        </li>

        <li className={style.course_item}>
           <div className={`${style.course_item_icon} ${style.level3}`}>
            <Image
             width={24}
             height={24}
             alt=""
             src={`/assets/${'level3'}.svg`}
            />
           </div>

           <div className={style.course_item_info}>
              <p className={style.course_item_info_name}>Moises</p>
              <p className={style.course_item_info_description}>Formacion de lideres</p>
           </div>

           <div className={`${style.course_item_level} ${style.level3}`}>
             <span>Nivel 3</span>
           </div>

        </li>

         <li className={style.course_item}>
           <div className={`${style.course_item_icon} ${style.renacer}`}>
            <Image
             width={24}
             height={24}
             alt=""
             src={`/assets/${'renacer'}.svg`}
            />
           </div>

           <div className={style.course_item_info}>
              <p className={style.course_item_info_name}>Renacer Mujeres II</p>
              <p className={style.course_item_info_description}>Sanacion Interior II</p>
           </div>

            <div className={`${style.course_item_level} ${style.renacer}`}>
             <span>Renacer</span>
           </div>

        </li>

        <li className={style.course_item}>
           <div className={`${style.course_item_icon} ${style.renacer}`}>
            <Image
             width={24}
             height={24}
             alt=""
            src={`/assets/${'renacer'}.svg`}
            />
           </div>

           <div className={style.course_item_info}>
              <p className={style.course_item_info_name}>Renacer Parejas</p>
              <p className={style.course_item_info_description}>Sanacion de parejas</p>
           </div>

            <div className={`${style.course_item_level} ${style.renacer}`}>
             <span>Renacer</span>
           </div>

        </li>

        <li className={style.course_item}>
           <div className={`${style.course_item_icon} ${style.level1}`}>
            <Image
             width={24}
             height={24}
             alt=""
             src={`/assets/${'level1'}.svg`}
            />
           </div>

           <div className={style.course_item_info}>
              <p className={style.course_item_info_name}>Felipe</p>
              <p className={style.course_item_info_description}>Iniciacion Cristiana</p>
           </div>

           <div className={`${style.course_item_level} ${style.level1}`}>
             <span>Nivel 1</span>
           </div>

        </li>

        <li className={style.course_item}>
           <div className={`${style.course_item_icon} ${style.level1}`}>
            <Image
             width={24}
             height={24}
             alt=""
             src={`/assets/${'level1'}.svg`}
            />
           </div>

           <div className={style.course_item_info}>
              <p className={style.course_item_info_name}>Juan</p>
              <p className={style.course_item_info_description}>Formacion de discipulos</p>
           </div>

           <div className={`${style.course_item_level} ${style.level1}`}>
             <span>Nivel 1</span>
           </div>

        </li>
       
       </ul>
       </div>


    </section>
  )
}

export default PendingCoursesList