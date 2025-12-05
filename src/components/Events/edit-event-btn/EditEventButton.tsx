
import { VscEdit } from 'react-icons/vsc';
import style from '../../../styles/buttons.module.css';

const EditEventButton = () => {
  return (
    <button className={style.outline_button}>
      <VscEdit size={18} />
       Edit event
    </button>
  )
}

export default EditEventButton