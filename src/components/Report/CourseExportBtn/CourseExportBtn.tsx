'use client';

import { useState } from 'react';
import { MdDownload } from 'react-icons/md';
import { getAllCompletionStatusCourseParticipants } from '@/lib/actions/reports/export-course-participants';

interface Props {
  query: string;
  status: 'completed' | 'not-completed';
  search: string;
}

const escapeCsvCell = (value: string | number | null | undefined) => {
  let cell = String(value ?? '');

  // Prevent spreadsheet formula execution while preserving valid CSV escaping.
  if (/^\s*[=+\-@]/.test(cell)) cell = `'${cell}`;

  return `"${cell.replaceAll('"', '""')}"`;
};

const CourseExportBtn = ({ query, status, search }: Props) => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState('');

  const handleExport = async () => {
    setIsExporting(true);
    setError('');

    try {
      const participants = await getAllCompletionStatusCourseParticipants(
        query,
        status,
        search,
      );
      const rows = [
        ['Name', 'Email', 'Phone', 'Completed On', 'Status'],
        ...participants.map((participant) => [
          `${participant.first_name} ${participant.last_name}`,
          participant.email,
          participant.phone,
          participant.completed_at
            ? new Date(participant.completed_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            : '',
          status === 'completed' ? 'Completed' : 'Not yet',
        ]),
      ];
      const csv = rows.map((row) => row.map(escapeCsvCell).join(',')).join('\r\n');
      const blob = new Blob([`\uFEFF${csv}`], {
        type: 'text/csv;charset=utf-8;',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `course-participation-${status}-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (exportError) {
      setError(
        exportError instanceof Error
          ? exportError.message
          : 'Unable to export the course participation report.',
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        className="flex shrink-0 items-center gap-2 rounded-[14px] border border-border bg-white px-4 py-2.5 text-[.9rem] font-semibold text-[#2E3135] cursor-pointer whitespace-nowrap disabled:cursor-wait disabled:opacity-60"
      >
        <MdDownload aria-hidden="true" />
        <span>{isExporting ? 'Exporting…' : 'Export CSV'}</span>
      </button>
      {error && (
        <span role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
};

export default CourseExportBtn;
