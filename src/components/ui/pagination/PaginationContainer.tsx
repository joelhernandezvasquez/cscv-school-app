
import { getStudentsPagination } from '@/lib/actions/students';
import {Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from '../pagination';
import style from './style.module.css';

interface Props{
  currentPage:number
}

const PaginationContainer = async ({currentPage}:Props) => {
  const {totalPages,totalStudents} = await getStudentsPagination();


  return (
    <div className={style.pagination_container}>
       <div className={style.pagination_info}>
        <p className={style.pagination_text}>Showing {currentPage}-{totalPages} of {totalStudents}</p>
       </div>

       <div className={style.pagination}>
          <Pagination>
            <PaginationContent className={style.pagination_content}>
              <PaginationItem>
                <PaginationPrevious className={style.pagination_item_link} href="#" />
              </PaginationItem>

              <PaginationItem className={`${style.pagination_item} ${style.active_link}`}>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>

              <PaginationItem className={style.pagination_item}>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>

              <PaginationItem className={style.pagination_item}>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              
{/* 
               <PaginationItem className={style.pagination_item}>
                  <PaginationEllipsis />
               </PaginationItem> */}

              <PaginationItem>
                <PaginationNext className={style.pagination_item_link} href="#" />
              </PaginationItem>
              
      </PaginationContent>
    </Pagination>
       </div>
    </div>
  )
}

export default PaginationContainer