import PaginationContainer from "@/components/ui/pagination/PaginationContainer";
import { getPaginatedCompletionStatusCourseList } from "@/lib/actions/reports";
import { CourseParticipantsResponse } from "@/types";

interface Props {
  query: string;
  status: string;
  currentPage: number;
}

const CourseParticipationPagination = async ({ query, status, currentPage }: Props) => {
  const { pagination }: CourseParticipantsResponse =
    await getPaginatedCompletionStatusCourseList(query, status, currentPage);

  return (
    <PaginationContainer
      currentPage={currentPage}
      query={query}
      extraParams={{ status }}
      pagination={{ totalPages: pagination.totalPages, totalCount: pagination.total }}
    />
  );
};

export default CourseParticipationPagination;
