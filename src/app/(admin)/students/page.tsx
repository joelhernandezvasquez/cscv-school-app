import { Suspense } from 'react';
import StudentMetrics from '@/components/Students/Students-Metrics/StudentMetrics';
import util from '../../../styles/utils.module.css';

const page = () => {
  return (
    <main className={util.wrapper}>
     <Suspense fallback="Loading...">
        <StudentMetrics/>
     </Suspense>

    </main>
  )
}

export default page