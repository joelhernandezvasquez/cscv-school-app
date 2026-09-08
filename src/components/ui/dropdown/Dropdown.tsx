import style from './style.module.css';

interface Props{
    className?:string,
    items:string[],
    onClose:(value:string) => void
}

const Dropdown = ({className,items,onClose}:Props) => {

  return (
    <div className={`${style.dropdown} ${ className && className}`}>
        <ul className={style.dropdown_menu}>
          {
            items.map((item)=>{
                return (
                  <li key={item}>
                    <button
                      type="button"
                      className={style.dropdown_item}
                      onClick={(e) => { e.stopPropagation(); onClose(item)}}
                    >
                      {item}
                    </button>
                  </li>
                )
            })
          }
        </ul>
    </div>
  )
}

export default Dropdown