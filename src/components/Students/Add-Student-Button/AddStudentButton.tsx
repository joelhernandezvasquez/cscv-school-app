import { FaUserPlus } from 'react-icons/fa';
import style from './style.module.css';

const AddStudentButton = () => {
  return (
    <>
        <button className={style.mobile_student_btn}>
           <FaUserPlus size={18} color='#2E3135'/>
        </button>

         <button className={style.desktop_student_btn}>
           Add Student
        </button>


    </>
  )
}

export default AddStudentButton