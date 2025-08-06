
import { ReactNode } from 'react';
import { IoIosClose } from 'react-icons/io';
import style from './style.module.css';
import UseClickAway from '@/hooks/UseClickAway';

interface Props{
    modalHeading:string,
    onCloseModal:() => void,
    subText?:string,
    children:ReactNode
}

const Modal = ({modalHeading,onCloseModal,subText,children}:Props) => {
  const modalRef = UseClickAway(onCloseModal);
  
  return (
    <div className={style.modal_container}>
        <div className={style.inner_modal} ref={modalRef}>
          <header className={style.modal_header}>
              <h2 className={style.heading}>{modalHeading}</h2>
              <IoIosClose size={30} onClick={onCloseModal} />
          </header>
          
          <section className={style.modal_content}>
            {subText && <p className={style.sub_text}>{subText}</p>}

            {children}
          </section>
        
        </div>
       
    </div>
  )
}

export default Modal