
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { eventTabs } from '@/lib/constants';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import UseToggle from '@/hooks/UseToggle';
import UseClickAway from '@/hooks/UseClickAway';
import style from './style.module.css';

const FilterEventTabs = () => {
   const {isToggle,handleToggle} = UseToggle();
   const dropdownRef = UseClickAway(handleToggle);
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const {replace} = useRouter();
   const [currentActiveTab,setCurrentActiveTab] = useState(searchParams.get('query') || 'All');

   const onChangeTab = (value:string) =>{
      setCurrentActiveTab(value);
      const params = new URLSearchParams(searchParams);
      params.set('page','1');

    if(value){
      params.set('query', value);
    }
    else{
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    handleToggle();
   }

  return (
    <section className={style.container}>

     <button className={style.filter_mobile_btn} onClick={handleToggle}>
      <span>{currentActiveTab}</span>
      <ChevronDown size={16} />
    </button>

      <ul className={style.filter_container}>
       {eventTabs.map((event)=>{
        return <li key={event.id}>{
             <button className={`${style.filter_tab_button} ${currentActiveTab===event.value && style.active_btn}`} onClick={() => onChangeTab(event.value)}>{event.value}</button>
        }</li>
       })}
    </ul>

     {isToggle &&
        <div ref={dropdownRef}>
          <Dropdown 
          className={style.dropdown_style} 
          items={eventTabs.map((item)=> item.value)}
          onClose={onChangeTab}
          />
        </div>  
     }
    </section>
   
  )
}

export default FilterEventTabs