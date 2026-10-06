
import { fetchCourses } from '@/lib/actions/courses';
import util from '../../../styles/utils.module.css';
import CourseParticipationDropdown from '@/components/Report/CourseParticipationDropdown/CourseParticipationDropdown';
import EmptyCourseParticipation from '@/components/Report/EmptyCourseParticipation/EmptyCourseParticipation';
import ReportMetrics from '@/components/Report/ReportMetrics/ReportMetrics';
import CourseCompletionTab from '@/components/Report/CourseCompletionTab/CourseCompletionTab';
import CourseSearchBar from '@/components/Report/CourseSearchBar/CourseSearchBar';
import CourseExportBtn from '@/components/Report/CourseExportBtn/CourseExportBtn';
import CourseParticipationTable from '@/components/Report/CourseParticipationTable/CourseParticipationTable';
import PaginationContainer from '@/components/ui/pagination/PaginationContainer';

const page = async() => {
    const courses = await fetchCourses();
    
    return (
    <main className={`${util.wrapper} bg-[#f7f8fa]`}>
       <header className='my-6'>
         <h1 className='text-[#11141a] text-[1.5rem] lg:text-[2rem]'>Course Participation</h1>
         <p className='text-[1rem] lg:text-[1.125rem]'>Find every active student who has, or hasn't, completed a course or retreat.</p>
       </header>

     <CourseParticipationDropdown courses={courses}/>
     {/* <EmptyCourseParticipation/> */}
     
      <ReportMetrics/>
      
      <section className={`mt-4 ${util.card_container} md:mt-6`}>
        <header className='flex flex-col gap-3 md:flex-row md:items-center'>
           <div>
              <CourseCompletionTab/>
           </div>

           <div className='flex items-center gap-3 md:ml-auto md:flex-1'>
               <CourseSearchBar/>
               <CourseExportBtn/>
           </div>
        </header>

        <div className='mt-4'>
          <CourseParticipationTable/>
        </div>

        <PaginationContainer currentPage={1} pagination={{ totalPages: 4, totalCount: 37 }} />
      </section>


    </main>
  )
}

export default page