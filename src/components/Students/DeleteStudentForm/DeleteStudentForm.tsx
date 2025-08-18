import forms from '../../../styles/forms.module.css';
import button from '../../../styles/buttons.module.css'

const DeleteStudentForm = () => {
  return (
    <form className={forms.delete_form}>
        <button className={button.delete_btn}>
            Yes, Confirm Deletion
        </button>

        <button className={button.cancel_btn}>
            No, Go back
        </button>
    </form>
  )
}

export default DeleteStudentForm