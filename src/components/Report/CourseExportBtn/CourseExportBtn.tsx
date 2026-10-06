import { MdDownload } from "react-icons/md";

const CourseExportBtn = () => {
  return (
    <button className="flex shrink-0 items-center gap-2 px-4 py-2.5 bg-white text-[#2E3135] border border-border rounded-[14px] text-[0.9rem] font-semibold cursor-pointer whitespace-nowrap">
     <MdDownload />
      <span>Export CSV</span>
    </button>
  );
};

export default CourseExportBtn;
