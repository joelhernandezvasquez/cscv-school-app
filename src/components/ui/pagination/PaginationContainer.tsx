import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import { PaginationData } from "@/types";
import style from "./style.module.css";

interface Props {
  currentPage: number;
  query?: string;
  sortBy?: string;
  extraParams?: Record<string, string>;
  pagination: PaginationData;
  pageSize?: number;
}

type PageToken = number | "ellipsis-start" | "ellipsis-end";

const buildHref = (
  page: number,
  query?: string,
  sortBy?: string,
  extraParams?: Record<string, string>,
) => {
  const params = new URLSearchParams({ page: String(page), ...extraParams });
  if (query) params.set("query", query);
  if (sortBy) params.set("sortBy", sortBy);
  return `?${params.toString()}`;
};

const getPageWindow = (
  currentPage: number,
  totalPages: number,
): PageToken[] => {
  const pages: PageToken[] = [];
  const siblings = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  let lastPage = 0;
  for (let page = 1; page <= totalPages; page++) {
    if (!siblings.has(page)) continue;
    if (page - lastPage === 2) pages.push(lastPage + 1);
    else if (page - lastPage > 2)
      pages.push(lastPage === 1 ? "ellipsis-start" : "ellipsis-end");
    pages.push(page);
    lastPage = page;
  }

  return pages;
};

const PaginationContainer = ({
  currentPage: requestedPage,
  query,
  sortBy,
  extraParams,
  pagination,
  pageSize: limit,
}: Props) => {
  const { totalPages, totalCount } = pagination;

  if (totalPages <= 0) return null;

  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);

  const pageSize =
    limit && limit > 0
      ? limit
      : Math.max(1, Math.ceil(totalCount / totalPages));
  const rangeStart = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalCount);
  const pages = getPageWindow(currentPage, totalPages);

  return (
    <div className={style.pagination_container}>
      <div className={style.pagination_info}>
        <p className={style.pagination_text}>
          Showing {rangeStart}-{rangeEnd} of {totalCount}
        </p>
      </div>

      <div className={style.pagination}>
        <Pagination className={style.pagination_nav}>
          <PaginationContent className={style.pagination_content}>
            <PaginationItem>
              {currentPage > 1 ? (
                <PaginationPrevious
                  href={buildHref(currentPage - 1, query, sortBy, extraParams)}
                />
              ) : (
                <PaginationPrevious
                  aria-disabled="true"
                  className={style.disabled_link}
                  href="#"
                />
              )}
            </PaginationItem>

            {pages.map((page) =>
              page === "ellipsis-start" || page === "ellipsis-end" ? (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={buildHref(page, query, sortBy, extraParams)}
                    isActive={page === currentPage}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              {currentPage < totalPages ? (
                <PaginationNext
                  href={buildHref(currentPage + 1, query, sortBy, extraParams)}
                />
              ) : (
                <PaginationNext
                  aria-disabled="true"
                  className={style.disabled_link}
                  href="#"
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PaginationContainer;
