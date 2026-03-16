import {useEffect,useRef} from 'react';

const UseClickAway = (closeWindow:()=>void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const handleClickOutside = (event:MouseEvent) =>{

      if(ref.current && !ref.current.contains(event.target as Node)){
        closeWindow();
      }
    }

    document.addEventListener('click',handleClickOutside);

    return (()=>{
        document.removeEventListener('click',handleClickOutside)
    })

  },[closeWindow])

  return ref;
}

export default UseClickAway