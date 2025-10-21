
import ManualCourseTable from "@/components/Students/ManualCourseTable/ManualCourseTable";
import { getPendingCoursesList } from "@/lib/actions/students";
import { mappedPendingCourses } from "@/lib/utils";
import util from '../../../../../styles/utils.module.css';

/* 
 6- make it responsive
 10- move functionalities to a custom hook(here)
*/
interface Props {
  params: { id: string };
}

const StudentManualCourse = async ({params}:Props) => {
  const {id} = params;
  const pendingCourses = mappedPendingCourses(await getPendingCoursesList(id));
  
  return (
    <main className={`${util.card_container}`}>
      <ManualCourseTable studentId={id} pendingCourses={pendingCourses}/>
    </main>
)}

export default StudentManualCourse