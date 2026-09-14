
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../pagination';
import { PaginationData } from '@/types';
import style from './style.module.css';

interface Props{
  currentPage:number,
  query?:string,
  sortBy?:string,
  pagination:PaginationData
}

type PageToken = number | 'ellipsis-start' | 'ellipsis-end';

const buildHref = (page: number, query?: string, sortBy?: string) => {
  const params = new URLSearchParams({ page: String(page) });
  if (query) params.set('query', query);
  if (sortBy) params.set('sortBy', sortBy);
  return `?${params.toString()}`;
};

const getPageWindow = (currentPage: number, totalPages: number): PageToken[] => {
  const pages: PageToken[] = [];
  const siblings = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  let lastPage = 0;
  for (let page = 1; page <= totalPages; page++) {
    if (!siblings.has(page)) continue;
    if (page - lastPage === 2) pages.push(lastPage + 1);
    else if (page - lastPage > 2) pages.push(lastPage === 1 ? 'ellipsis-start' : 'ellipsis-end');
    pages.push(page);
    lastPage = page;
  }

  return pages;
};

const PaginationContainer = ({currentPage,query,sortBy,pagination}:Props) => {

  const {totalPages,totalCount} = pagination;

  if (totalPages <= 0) return null;

  const pageSize = Math.max(1, Math.ceil(totalCount / totalPages));
  const rangeStart = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalCount);
  const pages = getPageWindow(currentPage, totalPages);

  return (
    <div className={style.pagination_container}>
       <div className={style.pagination_info}>
        <p className={style.pagination_text}>Showing {rangeStart}-{rangeEnd} of {totalCount}</p>
       </div>

       <div className={style.pagination}>
          <Pagination className={style.pagination_nav}>
            <PaginationContent className={style.pagination_content}>
              <PaginationItem>
                {
                  currentPage > 1
                  ? <PaginationPrevious href={buildHref(currentPage - 1, query, sortBy)} />
                  : <PaginationPrevious aria-disabled="true" className={style.disabled_link} href="#" />
                }
              </PaginationItem>

              {pages.map((page) => (
                page === 'ellipsis-start' || page === 'ellipsis-end'
                ? <PaginationItem key={page}><PaginationEllipsis /></PaginationItem>
                : <PaginationItem key={page}>
                    <PaginationLink
                      href={buildHref(page, query, sortBy)}
                      isActive={page === currentPage}
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
              ))}

              <PaginationItem>
                {
                  currentPage < totalPages
                  ? <PaginationNext href={buildHref(currentPage + 1, query, sortBy)} />
                  : <PaginationNext aria-disabled="true" className={style.disabled_link} href="#" />
                }
              </PaginationItem>

      </PaginationContent>
    </Pagination>
       </div>
    </div>
  )
}

export default PaginationContainer;
