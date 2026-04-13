
import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { toast, Toaster } from 'sonner';
import { CompletedCourse, CompletedCourseActionState } from '@/types';
import { CalendarRange } from '@/components/Events/calendar-range/CalendarRange';
import { formatLevelName } from '@/lib/utils';
import { updateStudentCourseDate } from '@/lib/actions/courses/updateStudentCourseDate';
import button from '../../../styles/buttons.module.css';
import form from '../../../styles/forms.module.css';


interface Props{
  studentId:string
  completedCourse:CompletedCourse
}
const UpdateStudentCourseForm = ({completedCourse,studentId}:Props) => {
  const {id,name,level,description,completeAt} = completedCourse;
  const today = new Date();
  const [pickDate,setPickDate] = useState<DateRange>({from:completeAt || today ,to:completeAt || today});
  const router = useRouter();

  const [data, action, isPending] = useActionState<CompletedCourseActionState, FormData>(
        customUpdateStudentCourseDate,
         { success: false, message: '' },
  );

  async function customUpdateStudentCourseDate (prevState: CompletedCourseActionState, formData: FormData) {
              const result = await updateStudentCourseDate(prevState, formData);
              if (result.success) {
                toast.success(result.message);
                setTimeout(() => {
                  router.refresh();
                  window.location.reload()
                }, 1000);
              }
              return result;
    };

  const onChangeDate = (dateRange:DateRange | undefined) =>{
    console.log('it was called')
    setPickDate(dateRange!);
  }

   const refreshPage = () =>{
    window.location.reload();
  }

  return (
    <form className={form.form} action={action}>
       <div className={form.form_field}>
          <label htmlFor='course_name'>Course</label>
          <input type='text' name='course_name' id='name' defaultValue={name} disabled/>
          <input type="hidden" name="student-id" value={studentId} />
          <input type='hidden' name='course-id' value={id}/>
       </div>

         <div className={form.form_field}>
              <label htmlFor='description'>Description</label>
              <input type='text' name='description' id='description' defaultValue={description} disabled/>
          </div>

            <div className={form.form_field}>
              <label htmlFor='level'>Level</label>
              <input type='text' name='level' id='level' defaultValue={formatLevelName(level)} disabled/>
          </div>

           <div className={`${form.form_field}`}>
            <label htmlFor='date'>Update Date</label>
             <CalendarRange onChange={onChangeDate} rangeDates={pickDate} captionDropdown={'dropdown'}/>
             <input 
                type="hidden" 
                name="courseDate" 
                defaultValue={JSON.stringify({ from: pickDate?.from,to: pickDate?.to})}
              /> 
          </div>


           <div className={form.buttons_container}>
            <button type='button' className={`${button.primary_btn} ${button.cancel_btn}`} 
              onClick={()=>refreshPage()}>Cancel</button>
             <button 
              className={`${button.primary_btn} ${button.submit_btn}`}
              disabled={isPending}
              >
             {isPending ? 'Submiting...' : 'Update' }
            </button>
          </div>
        <Toaster position="top-center" richColors  closeButton  /> 
         
    </form>
  )
}

export default UpdateStudentCourseForm