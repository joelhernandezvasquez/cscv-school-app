'use client';

import { getPageNameFromPath } from "@/lib/utils";
import { usePathname } from "next/navigation";
import style from './style.module.css';

const CurrentRoute = () => {
  const currentPath = usePathname();
  const pathName = getPageNameFromPath(currentPath);
  
  return (
    <h1 className={style.path_name}>{pathName}</h1>
  )
}

export default CurrentRoute