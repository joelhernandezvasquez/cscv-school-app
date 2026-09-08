'use client';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import UseClickAway from '@/hooks/UseClickAway';
import UseToggle from '@/hooks/UseToggle';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { courseTabs } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';

const FilterCourseTabs = () => {
  const {isToggle,handleToggle} = UseToggle();
  const dropdownRef = UseClickAway(handleToggle);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const [currentActiveTab,setCurrentActiveTab] = useState(searchParams.get('query') || 'All');

  const onChangeTab = (item:string) =>{
     setCurrentActiveTab(item);
      const params = new URLSearchParams(searchParams);

      if(item){
        params.set('query', item);
      }
      else{
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
     handleToggle();
  }

  return (
    <section className='relative'>
    <button
      className="flex items-center gap-4 border-0 py-2 px-5 rounded-lg text-[#11141A] cursor-pointer transition-colors hover:bg-[#F0F1F5] focus-visible:outline-2 focus-visible:outline-[#5655D7] focus-visible:outline-offset-2"
      onClick={handleToggle}
    >
      <span>{currentActiveTab}</span>
      <ChevronDown size={16} />
    </button>
    
    {
      isToggle && (
        <div ref={dropdownRef}>
         <Dropdown
          className={"dropdown-container"}
          items={courseTabs.map((item)=> item.value)}
          onClose={onChangeTab}
         />
        </div>
      )
    }
    </section>
  )
}

export default FilterCourseTabs