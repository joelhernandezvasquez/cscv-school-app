
import { getStudentsPagination } from '@/lib/actions/students';
import {Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from '../pagination';
import style from './style.module.css';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface Props{
  currentPage:number,
  query?:string,
  sortBy?:string
}

const PaginationContainer = async ({currentPage,query,sortBy}:Props) => {
  
  const {totalPages,totalStudents} = await getStudentsPagination();
  const pages = Array.from({length:totalPages},(_,i)=> i + 1 );

  return (
    <div className={style.pagination_container}>
       <div className={style.pagination_info}>
        <p className={style.pagination_text}>Showing {currentPage}-{totalPages} of {totalStudents}</p>
       </div>

       <div className={style.pagination}>
          <Pagination>
            <PaginationContent className={style.pagination_content}>
              <PaginationItem>
                {
                  currentPage > 1 
                  ? <PaginationPrevious className={`${style.pagination_item_link}`}  href={`?page=${currentPage - 1}${query && `&query=${query}`}${sortBy ? `&sortBy=${sortBy}` :''}`}/>
                  :  <ChevronLeftIcon size={40} style={{padding:'.5rem'}} />
                 
                }
                
              </PaginationItem>

              {pages.map((page: number) => {
                return <PaginationItem key={page} className={`${style.pagination_item}  ${page===currentPage && style.active_link}`}>
                        <PaginationLink 
                          href={`?page=${page}${query && `&query=${query}`}${sortBy ? `&sortBy=${sortBy}` :''}`}>
                         {page}
                        </PaginationLink>
                      </PaginationItem>
              })}

              <PaginationItem>
                {
                  currentPage < totalPages
                  ? <PaginationNext className={`${style.pagination_item_link}`}  href={`?page=${currentPage+1}${query && `&query=${query}`}${sortBy ? `&sortBy=${sortBy}` :''}`} />
                  : <ChevronRightIcon size={40} style={{padding:'.5rem'}}/>
                }
              </PaginationItem>
              
      </PaginationContent>
    </Pagination>
       </div>
    </div>
  )
}

export default PaginationContainer;