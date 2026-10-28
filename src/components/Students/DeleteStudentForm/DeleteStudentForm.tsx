import { useState } from 'react';
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
  const [isDeleting, setIsDeleting] = useState(false);

  const refreshPage = () =>{
   window.location.reload();
  }

  const onDeleteStudent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDeleting) return;
    setIsDeleting(true);
    try{
      const response = await deleteStudent(studentId);
      if(response?.success){
        toast.success(response?.message);
        setTimeout(()=>{
           router.refresh();
        },1000)
        return;
      }
      toast.error(response?.message || 'The student could not be deleted.');
    }
    catch(error){
      // In production Next.js hides server error messages, so log it and tell the user.
      console.log(error);
      toast.error('The student could not be deleted. Please try again.');
    }
    setIsDeleting(false);
  }

  return (
    <form className={forms.delete_form} onSubmit={onDeleteStudent}>
        <button type="submit" className={button.delete_btn} disabled={isDeleting}>
            Yes, Confirm Deletion
        </button>
        <button type="button" className={button.cancel_btn} onClick={() => refreshPage()}>
            No, Go back
        </button>

         <Toaster position="top-center" richColors  closeButton  />
    </form>

  )
}

export default DeleteStudentForm