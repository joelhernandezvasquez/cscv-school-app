import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import { deleteStudent } from '@/lib/actions/students/deleteStudent';
import forms from '../../../styles/forms.module.css';
import button from '../../../styles/buttons.module.css';
interface Props{
  studentId:number
}

const DeleteStudentForm = ({studentId}:Props) => {
  const router = useRouter();

  const refreshPage = () =>{
   window.location.reload();
  }

  const onDeleteStudent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     try{
       const response = await deleteStudent(studentId);
       if(response?.success){
         toast.success(response?.message); 
         setTimeout(()=>{
            router.refresh();
         },1000)
       }
     }
     catch(error){
       console.log(error);
     }
  }

  return (
    <form className={forms.delete_form} onSubmit={onDeleteStudent}>
        <button className={button.delete_btn}>
            Yes, Confirm Deletion
        </button>
        <button className={button.cancel_btn} onClick={() => refreshPage()}>
            No, Go back
        </button>

         <Toaster position="top-center" richColors  closeButton  />
    </form>

  )
}

export default DeleteStudentForm