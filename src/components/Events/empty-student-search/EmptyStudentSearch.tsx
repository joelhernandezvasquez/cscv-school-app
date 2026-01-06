import style from './style.module.css';
import button from '../../../styles/buttons.module.css';

const EmptyStudentSearch = () => {
  return (
    <div className={style.empty_student_search_container}>
       <h2 className={style.empty_result}>No Student Found Try Searching with a different Name</h2>
       <button className={button.add_button}>Add New Student</button>
    </div>
  )
}

export default EmptyStudentSearch