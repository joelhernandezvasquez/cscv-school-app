import UseToggle from '@/hooks/UseToggle';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { IoStatsChartOutline } from 'react-icons/io5';

const Report = () => {
  const { isToggle, handleToggle } = UseToggle();

  return (
   <div className='py-4 mb-6'>
      <div className='group flex items-center justify-between px-2.5 cursor-pointer'>
          <button className={'flex bg-neutral-50 cursor-pointer border border-0 gap-4 text-[#11141A] font-medium text-[1.125rem] group-hover:text-(--primary_blue)'}
           onClick={handleToggle}
          >
              <IoStatsChartOutline size={24}></IoStatsChartOutline>
              Reports
          </button>

          <ChevronDown className='mt-2 group-hover:text-(--primary_blue)' size={24} />
       </div>
          
          {isToggle &&
          <ul className='flex flex-col px-6 gap-4'>
                <li className='text-[#5655D7] font-bold cursor-pointer mt-2'>
                  
                <Link href={'/course-report'}> Course Completion</Link>  
                 
               </li>
          </ul>
         }

    </div>

     
    
  )
}

export default Report