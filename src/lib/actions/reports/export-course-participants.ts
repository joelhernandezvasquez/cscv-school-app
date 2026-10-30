"use server";

import { getPaginatedCompletionStatusCourseList } from "@/lib/actions/reports";
import { normalizeParticipant } from "@/lib/utils";
import type { CourseParticipant, CourseParticipantsResponse } from "@/types";

export const getAllCompletionStatusCourseParticipants = async (
  query: string,
  status: "completed" | "not-completed",
  search = "",
): Promise<CourseParticipant[]> => {
  const firstPage: CourseParticipantsResponse =
    await getPaginatedCompletionStatusCourseList(query, status, 1, search);
  const remainingPages = Array.from(
    { length: Math.max(0, firstPage.pagination.totalPages - 1) },
    (_, index) => index + 2,
  );
  const otherPages: CourseParticipantsResponse[] = await Promise.all(
    remainingPages.map((page) =>
      getPaginatedCompletionStatusCourseList(query, status, page, search),
    ),
  );

  // Promise.all keeps page order, so rows stay in the same order as before.
  return [firstPage, ...otherPages].flatMap((response) =>
    response.students.map(normalizeParticipant),
  );
};
