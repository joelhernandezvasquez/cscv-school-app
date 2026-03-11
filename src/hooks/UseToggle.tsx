import {useState} from 'react';

const UseToggle = () => {
  const [isToggle,setIsToggle] = useState(false);

  const handleToggle = () =>{
    setIsToggle(!isToggle)
  }
  return {isToggle,handleToggle}
    
}

export default UseToggle;