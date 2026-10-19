'use server';

import { getPaginatedCompletionStatusCourseList } from '@/lib/actions/reports';
import type { CourseParticipant, CourseParticipantRow, CourseParticipantsResponse } from '@/types';

const normalizeParticipant = (row: CourseParticipantRow): CourseParticipant =>
  'student' in row
    ? { ...row.student, id: row.id, completed_at: row.completedAt }
    : { ...row, completed_at: null };

export const getAllCompletionStatusCourseParticipants = async (
  query: string,
  status: 'completed' | 'not-completed',
  search = '',
): Promise<CourseParticipant[]> => {
  const firstPage: CourseParticipantsResponse =
    await getPaginatedCompletionStatusCourseList(query, status, 1, search);
  const participants = firstPage.students.map(normalizeParticipant);

  for (let page = 2; page <= firstPage.pagination.totalPages; page += 1) {
    const response: CourseParticipantsResponse =
      await getPaginatedCompletionStatusCourseList(query, status, page, search);
    participants.push(...response.students.map(normalizeParticipant));
  }

  return participants;
};