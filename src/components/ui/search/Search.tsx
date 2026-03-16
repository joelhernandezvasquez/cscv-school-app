'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import style from './style.module.css';
interface Props{
    placeholder:string
}

const Search = ({placeholder}:Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch =  useDebouncedCallback((term:string) =>{
     const params = new URLSearchParams(searchParams);
      params.set('page', '1');

     if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  },300)

  return (
    <div className={style.search_container}>
      <input
        className={style.search_input} 
        type="text" 
        id="search"
        name="search"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.25 2.5C4.62665 2.5 2.5 4.62665 2.5 7.25C2.5 9.87335 4.62665 12 7.25 12C9.87335 12 12 9.87335 12 7.25C12 4.62665 9.87335 2.5 7.25 2.5ZM1.5 7.25C1.5 4.07436 4.07436 1.5 7.25 1.5C10.4256 1.5 13 4.07436 13 7.25C13 10.4256 10.4256 13 7.25 13C4.07436 13 1.5 10.4256 1.5 7.25Z" fill="#2E3135"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.6089 10.6089C10.8042 10.4137 11.1208 10.4137 11.3161 10.6089L14.3536 13.6464C14.5488 13.8417 14.5488 14.1583 14.3536 14.3536C14.1583 14.5488 13.8417 14.5488 13.6464 14.3536L10.6089 11.3161C10.4137 11.1208 10.4137 10.8042 10.6089 10.6089Z" fill="#2E3135"/>
     </svg>
    </div>
  )
}

export default Search