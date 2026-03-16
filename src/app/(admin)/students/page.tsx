import { Suspense } from 'react';
import { Metadata } from 'next';
import { getStudentsPagination } from '@/lib/actions/students';
import StudentMetrics from '@/components/Students/Students-Metrics/StudentMetrics';
import Search from '@/components/ui/search/Search';
import FilterDropdown from '@/components/ui/filter-dropdown/FilterDropdown';
import AddStudentButton from '@/components/Students/Add-Student-Button/AddStudentButton';
import SortByStudents from '@/components/Students/SortByStudents/SortByStudents';
import StudentContentTable from '@/components/Students/StudentContentTable/StudentContentTable';
import PaginationContainer from '@/components/ui/pagination/PaginationContainer';
import GridStatSkeleton from '@/components/ui/grid-stat-skeleton/GridStatSkeleton';
import TableSkeleton from '@/components/ui/table-skeleton/TableSkeleton';
import { filterStudentOptions, sortStudentOptions } from '@/lib/constants';
import util from '../../../styles/utils.module.css';
import style from './style.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Students",
  description: "CSCV Academy",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?:string
  }>;
}) {

  const [searchParams, pagination] = await Promise.all([
  props.searchParams,
  getStudentsPagination()
]);
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const sortBy = searchParams?.sortBy;

  return (
    <main className={util.wrapper}>
     <Suspense fallback={<GridStatSkeleton/>}>
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

        <Suspense key={query + currentPage} fallback={<TableSkeleton/>}>
            <StudentContentTable 
              query={query} 
              currentPage={currentPage}
              sortBy={sortBy}
             /> 
        </Suspense>
        <PaginationContainer 
           currentPage={currentPage} 
           query={query} 
           sortBy={sortBy}
           pagination={pagination}
           />
     </section>

    </main>
  )
}