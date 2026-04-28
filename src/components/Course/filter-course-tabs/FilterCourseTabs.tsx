'use client';
import { useState } from 'react';
import UseClickAway from '@/hooks/UseClickAway';
import UseToggle from '@/hooks/UseToggle';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { courseTabs } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';

const FilterCourseTabs = () => {
  const {isToggle,handleToggle} = UseToggle();
  const dropdownRef = UseClickAway(handleToggle);
  const [currentActiveTab,setCurrentActiveTab] = useState('All');

  const onChangeTab = (item:string) =>{
     setCurrentActiveTab(item);
     handleToggle();
  }

  return (
    <section className='relative'>
    <button 
      className="flex items-center gap-4 border-0 py-2 px-5 rounded-lg text-[#11141A]"
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