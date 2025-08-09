'use client';
import { useState } from 'react';
import UseToggle from '@/hooks/UseToggle';
import Dropdown from '../dropdown/Dropdown';
import { useSearchParams, usePathname,useRouter } from 'next/navigation';
import UseClickAway from '@/hooks/UseClickAway';
import style from './style.module.css';
interface Props {
  itemList:string []
}

const FilterDropdown = ({itemList}:Props) => {
  const {isToggle,handleToggle} = UseToggle();
  const [dropdownValue,setDropdownValue] = useState<string>('Filter');
  const dropdownRef = UseClickAway(handleToggle);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  
   const onClose = (value:string) =>{
      setDropdownValue(value);
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
    <div className={style.filter_container}>
      
        <button className={style.filter_mobile_btn} onClick={handleToggle}>
             <svg  width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.3026 2.1875C2.30264 2.1875 2.30255 2.1875 2.3026 2.1875H11.6979C11.8676 2.18755 12.0338 2.23697 12.176 2.32972C12.3181 2.42248 12.4302 2.55457 12.4986 2.7099C12.567 2.86524 12.5887 3.03711 12.5612 3.20458C12.5336 3.37173 12.4582 3.5273 12.344 3.6524C12.3438 3.65264 12.3436 3.65288 12.3434 3.65313L8.75025 7.60719V10.7007C8.7512 10.8462 8.7156 10.9897 8.6467 11.1179C8.57792 11.2459 8.47816 11.3546 8.35657 11.4341L6.6083 12.5978L6.60652 12.599C6.47524 12.6854 6.32308 12.7349 6.16604 12.7423C6.009 12.7496 5.85289 12.7145 5.71411 12.6406C5.57534 12.5668 5.45902 12.4569 5.3774 12.3225C5.29578 12.1882 5.25187 12.0343 5.25027 11.8771L5.25023 11.8727L5.25025 7.60721L5.24909 7.60597L1.65714 3.65313C1.65695 3.65291 1.65675 3.6527 1.65656 3.65248C1.54232 3.52737 1.46686 3.37177 1.43935 3.20458C1.41179 3.03711 1.43353 2.86524 1.50192 2.7099C1.57032 2.55457 1.68241 2.42248 1.82455 2.32972C1.96659 2.23703 2.13251 2.18762 2.30212 2.1875M11.6978 3.0625H2.30273L2.30373 3.06358L5.89501 7.01564C6.04439 7.17686 6.12674 7.38895 6.12525 7.60875V11.8682L7.87524 10.7034L7.87523 10.7023L7.87525 7.60875C7.87377 7.38895 7.95611 7.17686 8.10549 7.01564L11.6968 3.06359L11.6978 3.0625Z" fill="#2E3135"/>
            </svg>
        </button>

       <button className={style.filter_desktop_btn} onClick={handleToggle}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.3026 2.1875C2.30264 2.1875 2.30255 2.1875 2.3026 2.1875H11.6979C11.8676 2.18755 12.0338 2.23697 12.176 2.32972C12.3181 2.42248 12.4302 2.55457 12.4986 2.7099C12.567 2.86524 12.5887 3.03711 12.5612 3.20458C12.5336 3.37173 12.4582 3.5273 12.344 3.6524C12.3438 3.65264 12.3436 3.65288 12.3434 3.65313L8.75025 7.60719V10.7007C8.7512 10.8462 8.7156 10.9897 8.6467 11.1179C8.57792 11.2459 8.47816 11.3546 8.35657 11.4341L6.6083 12.5978L6.60652 12.599C6.47524 12.6854 6.32308 12.7349 6.16604 12.7423C6.009 12.7496 5.85289 12.7145 5.71411 12.6406C5.57534 12.5668 5.45902 12.4569 5.3774 12.3225C5.29578 12.1882 5.25187 12.0343 5.25027 11.8771L5.25023 11.8727L5.25025 7.60721L5.24909 7.60597L1.65714 3.65313C1.65695 3.65291 1.65675 3.6527 1.65656 3.65248C1.54232 3.52737 1.46686 3.37177 1.43935 3.20458C1.41179 3.03711 1.43353 2.86524 1.50192 2.7099C1.57032 2.55457 1.68241 2.42248 1.82455 2.32972C1.96659 2.23703 2.13251 2.18762 2.30212 2.1875M11.6978 3.0625H2.30273L2.30373 3.06358L5.89501 7.01564C6.04439 7.17686 6.12674 7.38895 6.12525 7.60875V11.8682L7.87524 10.7034L7.87523 10.7023L7.87525 7.60875C7.87377 7.38895 7.95611 7.17686 8.10549 7.01564L11.6968 3.06359L11.6978 3.0625Z" fill="#2E3135"/>
          </svg>
          
          <span>{dropdownValue}</span>

          <svg className={`${style.icon} ${isToggle && style.flip_icon}`} width="14" height="14" viewBox="0 0 14 14" fill="none">
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

export default FilterDropdown