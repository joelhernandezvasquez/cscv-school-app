import ManualCourseTable from "@/components/Students/ManualCourseTable/ManualCourseTable";
import { getPendingCoursesList } from "@/lib/actions/students";
import { mappedPendingCourses } from "@/lib/utils";
import util from '../../../../../styles/utils.module.css';
interface Props {
  params: { id: string };
}

const StudentManualCourse = async ({params}:Props) => {
  const {id} = await params;
  const pendingCourses = mappedPendingCourses(await getPendingCoursesList(id));
  
  return (
    <main className={`${util.card_container}`}>
      <ManualCourseTable studentId={id} pendingCourses={pendingCourses}/>
    </main>
)}

export default StudentManualCourse