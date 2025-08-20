
import { ReactNode } from 'react';
import { IoIosClose } from 'react-icons/io';
import style from './style.module.css';

interface Props{
    heading:string,
    subText?:string,
    children:ReactNode,
}

const DeleteModal = ({heading,subText,children}:Props) => {

  const closeModal = () =>{
    window.location.reload();
  }
  return (
    <div className={style.delete_modal}>
       <div className={style.inner_modal}>
         <header className={style.modal_header}>
              <h2 className={style.heading}>{heading}</h2>
              <IoIosClose className={style.close_icon} size={30} onClick={closeModal} />
          </header>
             <section className={style.modal_content}>
            {subText && <p className={style.sub_text}>{subText}</p>}

            {children}
          </section>
       </div>
    </div>
  )
}

export default DeleteModal