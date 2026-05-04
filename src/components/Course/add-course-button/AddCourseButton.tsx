'use client';
import UseToggle from "@/hooks/UseToggle";
import Modal from '@/components/ui/modal/Modal';
import AddCourseForm from "../add-course-form/AddCourseForm";

const AddCourseButton = () => {
  const{isToggle,handleToggle} = UseToggle();
  
  return (
    <>
    <button 
        type='button'
        className='bg-[#CDDEFF] border-none rounded-lg py-2 px-6 text-md text-[#2E3135] cursor-pointer font-medium'
        onClick={handleToggle}
    >
    Add Course    
    </button>
   
   {isToggle && (
    <Modal
      modalHeading='Add New Course' 
      onCloseModal={handleToggle}
    >
     <AddCourseForm onClose={handleToggle}/>
   </Modal>
   )}

    </>
  )
}

export default AddCourseButton

