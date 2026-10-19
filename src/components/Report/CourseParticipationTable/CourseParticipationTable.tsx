import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CopyableValue from "./CopyableValue";
import { cn, getFormattedDate } from "@/lib/utils";
import { CourseParticipant, CourseParticipantRow, CourseParticipantsResponse } from "@/types";
import { getPaginatedCompletionStatusCourseList } from "@/lib/actions/reports";

const headClass =
  "h-auto px-3 pt-0 pb-2.5 text-left align-middle text-[.82rem] font-bold uppercase tracking-[.02em] text-[#4D5154]";
const cellClass = "px-3 py-3.5 text-left align-middle";

const getInitials = (first: string, last: string) =>
  `${first[0]}${last[0]}`.toUpperCase();

const StatusPill = ({ completed }: { completed: boolean }) => (
  <span
    className={cn(
      "inline-flex items-center justify-center min-w-27.5 px-2.5 py-1 rounded-3xl text-[.82rem] font-semibold",
      completed ? "bg-[#5655D7] text-white" : "bg-[#E2E2E3] text-[#2E3135]",
    )}
  >
    {completed ? "Completed" : "Not yet"}
  </span>
);

const Initials = ({ first, last }: { first: string; last: string }) => (
  <span className="flex h-8.5 w-8.5 flex-none items-center justify-center rounded-full bg-[#5655D7] text-[.82rem] font-bold text-white">
    {getInitials(first, last)}
  </span>
);

const normalizeParticipant = (row: CourseParticipantRow): CourseParticipant =>
  "student" in row
    ? { ...row.student, id: row.id, completed_at: row.completedAt }
    : { ...row, completed_at: null };

interface Props{
    query:string,
    sortBy?:string,
    currentPage:number | string,
    status:string,
    search?:string,
}

const CourseParticipationTable = async({query,currentPage,status,search = ''}:Props) => {
  const { students }: CourseParticipantsResponse = await getPaginatedCompletionStatusCourseList(query,status,currentPage,search);
  const participants = students.map(normalizeParticipant);

  return (
    <>
      {/* Mobile cards */}
      <ul className="flex flex-col lg:hidden">
        {participants.map((p) => (
          <li
            key={p.id}
            className="flex justify-between gap-3 border-t border-[#E2E2E3] px-1 py-4 first:border-t-0"
          >
            <div className="flex gap-3">
              <Initials first={p.first_name} last={p.last_name} />
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-[#11141A]">
                  {p.first_name} {p.last_name}
                </span>
                <CopyableValue
                  value={p.phone}
                  className="mt-1 text-[.82rem] text-[#4D5154]"
                />
                <span className="mt-1 text-[.82rem] text-[#4D5154]">
                  {p.completed_at
                    ? `Completed ${getFormattedDate(new Date(p.completed_at))}`
                    : "Not completed yet"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-1.5 text-[.8rem] text-[#4D5154]">
              <span
                className={cn(
                  "mt-1 h-2 w-2 rounded-full",
                  status==='completed' ? "bg-[#5655D7]" : "bg-[#E2E2E3]",
                )}
              />
              {status==='completed' ? "Completed" : "Not yet"}
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop table */}
      <Table className="hidden border-collapse lg:table">
        <TableHeader className="[&_tr]:border-[#E2E2E3]">
          <TableRow>
            <TableHead className={headClass}>Name</TableHead>
            <TableHead className={headClass}>Phone</TableHead>
            <TableHead className={headClass}>Completed on</TableHead>
            <TableHead className={headClass}>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {participants.map((p) => (
            <TableRow
              key={p.id}
              className="border-b border-[#E2E2E3] last:border-b-0"
            >
              <TableCell className={cellClass}>
                <div className="flex items-center gap-2.5">
                  <Initials first={p.first_name} last={p.last_name} />
                  <div className="flex flex-col">
                    <span className="text-[.94rem] font-semibold leading-snug text-[#11141A]">
                      {p.first_name} {p.last_name}
                    </span>
                    <CopyableValue
                      value={p.email}
                      className="text-[.8rem] leading-snug text-[#4D5154]"
                    />
                  </div>
                </div>
              </TableCell>

              <TableCell
                className={cn(cellClass, "font-medium text-[#4D5154]")}
              >
                <CopyableValue value={p.phone} />
              </TableCell>

              <TableCell
                className={cn(cellClass, "font-medium text-[#4D5154]")}
              >
                {p.completed_at
                  ? getFormattedDate(new Date(p.completed_at))
                  : <span className="opacity-60">—</span>}
              </TableCell>

              <TableCell className={cellClass}>
                <StatusPill completed={status==='completed' ? true :false} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CourseParticipationTable;
