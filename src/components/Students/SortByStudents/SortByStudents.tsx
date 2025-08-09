'use client';
import { useState } from 'react';
import { useSearchParams, usePathname,useRouter } from 'next/navigation';
import UseToggle from '@/hooks/UseToggle';
import UseClickAway from '@/hooks/UseClickAway';
import style from './style.module.css';
import Dropdown from '@/components/ui/dropdown/Dropdown';
interface Props {
  itemList:string []
}

const SortByStudents = ({itemList}:Props) => {
  const {isToggle,handleToggle} = UseToggle();
  const [dropdownValue,setDropdownValue] = useState<string>(itemList[0]);
  const dropdownRef = UseClickAway(handleToggle);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const onClose = (value:string) =>{
      setDropdownValue(value);
      const params = new URLSearchParams(searchParams);
      params.set('page','1');

    if(value){
      params.set('sortBy',value)
    }
    else{
      params.delete('sortBy');
    }
    replace(`${pathname}?${params.toString()}`);
    handleToggle();
   }

  return (
    <div className={style.sort_by}>
       <p>Sort by</p>
       <button onClick={handleToggle}>
         <span>{dropdownValue}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.19064 5.37814C3.3615 5.20729 3.6385 5.20729 3.80936 5.37814L7 8.56878L10.1906 5.37814C10.3615 5.20729 10.6385 5.20729 10.8094 5.37814C10.9802 5.549 10.9802 5.826 10.8094 5.99686L7.30936 9.49686C7.1385 9.66771 6.8615 9.66771 6.69064 9.49686L3.19064 5.99686C3.01979 5.826 3.01979 5.549 3.19064 5.37814Z" fill="#2E3135"/>
          </svg> 
       </button>

        {isToggle &&
        <div ref={dropdownRef}>
          <Dropdown 
          className={style.dropdown_style} 
          items={itemList}
          onClose={onClose}
          />
        </div> 
      } 
    </div>
  )
}

export default SortByStudents