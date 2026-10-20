import PaginationContainer from "@/components/ui/pagination/PaginationContainer";
import { getPaginatedCompletionStatusCourseList } from "@/lib/actions/reports";
import { CourseParticipantsResponse } from "@/types";

interface Props {
  query: string;
  status: string;
  currentPage: number;
  search?: string;
}

const CourseParticipationPagination = async ({
  query,
  status,
  currentPage,
  search = "",
}: Props) => {
  const { pagination }: CourseParticipantsResponse =
    await getPaginatedCompletionStatusCourseList(
      query,
      status,
      currentPage,
      search,
    );

  return (
    <PaginationContainer
      currentPage={currentPage}
      query={query}
      extraParams={{ status, ...(search ? { search } : {}) }}
      pageSize={pagination.limit}
      pagination={{
        totalPages: pagination.totalPages,
        totalCount: pagination.total,
      }}
    />
  );
};

export default CourseParticipationPagination;
