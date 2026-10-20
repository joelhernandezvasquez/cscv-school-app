"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoStatsChartOutline } from "react-icons/io5";

const REPORT_PATH = "/course-report";

const Report = () => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(REPORT_PATH);
  const [isToggle, setIsToggle] = useState(isActive);

  return (
    <div className="py-4 mb-6">
      <div className="group flex items-center justify-between px-2.5 cursor-pointer">
        <button
          aria-expanded={isToggle}
          className={
            "flex bg-neutral-50 cursor-pointer border-0 gap-4 text-[#11141A] font-medium text-[1.125rem] group-hover:text-(--primary_blue)"
          }
          onClick={() => setIsToggle((open) => !open)}
        >
          <IoStatsChartOutline size={24}></IoStatsChartOutline>
          Reports
        </button>

        <ChevronDown
          className={`mt-2 transition-transform duration-200 group-hover:text-(--primary_blue) ${isToggle ? "rotate-180" : ""}`}
          size={24}
        />
      </div>

      {isToggle && (
        <ul className="flex flex-col px-6 gap-4">
          <li className="mt-2">
            <Link
              href={REPORT_PATH}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "font-bold text-[#5655D7]"
                  : "font-medium text-[#4D5154] hover:text-[#5655D7]"
              }
            >
              Course Participation
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Report;
