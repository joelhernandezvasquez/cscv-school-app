import { Suspense } from 'react';
import StudentMetrics from '@/components/Students/Students-Metrics/StudentMetrics';
import Search from '@/components/ui/search/Search';
import FilterDropdown from '@/components/ui/filter-dropdown/FilterDropdown';
import AddStudentButton from '@/components/Students/Add-Student-Button/AddStudentButton';
import SortByStudents from '@/components/Students/SortByStudents/SortByStudents';
import StudentContentTable from '@/components/Students/StudentContentTable/StudentContentTable';
import PaginationContainer from '@/components/ui/pagination/PaginationContainer';
import { filterStudentOptions, sortStudentOptions } from '@/lib/constants';
import style from './style.module.css';
import util from '../../../styles/utils.module.css';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?:string
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const sortBy = searchParams?.sortBy;
  return (
    <main className={util.wrapper}>
     <Suspense fallback="Loading...">
        <StudentMetrics/>
     </Suspense>

     <section className={`${style.student_table_container} ${util.card_container}`}>
       <header className={style.student_table_header}>
         <div className={style.student_table_header_left_col}>
         <Search placeholder='Search name, etc'/>
         <FilterDropdown itemList={filterStudentOptions}/>
         </div>
        
         <SortByStudents itemList={sortStudentOptions}/>
         <AddStudentButton/>
       </header> 

        <Suspense key={query + currentPage} fallback={'Loading Table...'}>
            <StudentContentTable 
              query={query} 
              currentPage={currentPage}
              sortBy={sortBy}
             /> 
        </Suspense>
        <PaginationContainer currentPage={currentPage}/>
     </section>

    </main>
  )
}