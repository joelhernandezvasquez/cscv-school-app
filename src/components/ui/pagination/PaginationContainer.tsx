
import {Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from '../pagination';
import style from './style.module.css';

const PaginationContainer = () => {
  return (
    <div className={style.pagination_container}>
       <div className={style.pagination_info}>
        <p className={style.pagination_text}>Showing 1-12 of 560</p>
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