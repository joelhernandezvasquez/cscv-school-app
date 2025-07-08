import { Suspense } from 'react';
import StudentMetrics from '@/components/Students/Students-Metrics/StudentMetrics';
import Search from '@/components/ui/search/Search';
import util from '../../../styles/utils.module.css';
import style from './style.module.css';

const page = () => {
  return (
    <main className={util.wrapper}>
     <Suspense fallback="Loading...">
        <StudentMetrics/>
     </Suspense>

     <section className={`${style.student_table_container} ${util.card_container}`}>
       <header className={style.student_table_header}>
         <Search placeholder='Search name, etc'/>
         
       </header> 
     </section>

    </main>
  )
}

export default page