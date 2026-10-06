import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CopyableValue from "./CopyableValue";
import { cn } from "@/lib/utils";

// Static placeholder data — will be replaced by the backend response.
const participants = [
  {
    id: 1,
    firstName: "Ana",
    lastName: "Pérez García",
    email: "ana.perez@gmail.com",
    phone: "809-412-3381",
    completedAt: "Mar 14, 2025",
  },
  {
    id: 2,
    firstName: "Luis",
    lastName: "Martínez Cruz",
    email: "luis.martinez@hotmail.com",
    phone: "809-231-9042",
    completedAt: null,
  },
  {
    id: 3,
    firstName: "María",
    lastName: "Rodríguez Flores",
    email: "maria.rodriguez@outlook.com",
    phone: "809-775-1120",
    completedAt: "Nov 02, 2024",
  },
  {
    id: 4,
    firstName: "José",
    lastName: "Hernández Reyes",
    email: "jose.hernandez@gmail.com",
    phone: "809-654-7788",
    completedAt: null,
  },
  {
    id: 5,
    firstName: "Carmen",
    lastName: "López Peña",
    email: "carmen.lopez@gmail.com",
    phone: "809-318-4406",
    completedAt: "Jun 21, 2025",
  },
  {
    id: 6,
    firstName: "Rafael",
    lastName: "González Vargas",
    email: "rafael.gonzalez@hotmail.com",
    phone: "809-902-5513",
    completedAt: null,
  },
  {
    id: 7,
    firstName: "Sofía",
    lastName: "Ramírez Castillo",
    email: "sofia.ramirez@gmail.com",
    phone: "809-547-2209",
    completedAt: "Jan 18, 2025",
  },
  {
    id: 8,
    firstName: "Miguel",
    lastName: "Torres Medina",
    email: "miguel.torres@outlook.com",
    phone: "809-486-3315",
    completedAt: null,
  },
  {
    id: 9,
    firstName: "Lucía",
    lastName: "Díaz Santana",
    email: "lucia.diaz@hotmail.com",
    phone: "809-693-8472",
    completedAt: "Aug 09, 2025",
  },
  {
    id: 10,
    firstName: "Daniel",
    lastName: "Morales Jiménez",
    email: "daniel.morales@gmail.com",
    phone: "809-720-6154",
    completedAt: null,
  },
];

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

const CourseParticipationTable = () => {
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
              <Initials first={p.firstName} last={p.lastName} />
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-[#11141A]">
                  {p.firstName} {p.lastName}
                </span>
                <CopyableValue
                  value={p.phone}
                  className="mt-1 text-[.82rem] text-[#4D5154]"
                />
                <span className="mt-1 text-[.82rem] text-[#4D5154]">
                  {p.completedAt
                    ? `Completed ${p.completedAt}`
                    : "Not completed yet"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-1.5 text-[.8rem] text-[#4D5154]">
              <span
                className={cn(
                  "mt-1 h-2 w-2 rounded-full",
                  p.completedAt ? "bg-[#5655D7]" : "bg-[#E2E2E3]",
                )}
              />
              {p.completedAt ? "Completed" : "Not yet"}
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
                  <Initials first={p.firstName} last={p.lastName} />
                  <div className="flex flex-col">
                    <span className="text-[.94rem] font-semibold leading-snug text-[#11141A]">
                      {p.firstName} {p.lastName}
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
                {p.completedAt ?? <span className="opacity-60">—</span>}
              </TableCell>

              <TableCell className={cellClass}>
                <StatusPill completed={!!p.completedAt} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CourseParticipationTable;
