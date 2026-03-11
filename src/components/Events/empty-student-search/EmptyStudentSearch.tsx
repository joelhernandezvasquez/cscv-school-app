import style from './style.module.css';
import button from '../../../styles/buttons.module.css';
import UseToggle from '@/hooks/UseToggle';
import Modal from '@/components/ui/modal/Modal';
import AddStudentForm from '@/components/Students/AddStudentForm/AddStudentForm';

const EmptyStudentSearch = () => {
 
  const {isToggle,handleToggle} = UseToggle();

  return (
    <div className={style.empty_student_search_container}>
       <h2 className={style.empty_result}>No Student Found Try Searching with a different Name</h2>
       <button className={button.add_button} onClick={handleToggle}>Add New Student</button>
      
      {isToggle && 
      <Modal 
        modalHeading='Add New Student' 
        onCloseModal={handleToggle}
        subText='Complete the information to register a new student.'>
        {<AddStudentForm onClose={handleToggle}/>}
      </Modal>
      }
    </div>
  )
}

export default EmptyStudentSearch