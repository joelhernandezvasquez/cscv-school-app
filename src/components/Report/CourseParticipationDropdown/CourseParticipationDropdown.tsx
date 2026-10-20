"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import UseClickAway from "@/hooks/UseClickAway";
import { Courses } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  courses: Courses[];
}

const CourseParticipationDropdown = ({ courses }: Props) => {
  const [isToggle, setIsToggle] = useState(false);
  const handleToggle = () => setIsToggle((open) => !open);
  const closeMenu = useCallback(() => setIsToggle(false), []);
  const containerRef = UseClickAway(closeMenu);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isToggle) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isToggle, closeMenu]);

  const searchParams = useSearchParams();
  const selectedId = searchParams.get("query");
  const courseSelected =
    courses.find((course) => course.id?.toString() === selectedId)?.name ??
    "Choose a course or retreat…";
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSelectCourse = (course: Courses) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.delete("search");

    if (course.id) {
      params.set("query", course.id.toString());
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    closeMenu();
    triggerRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-white rounded-2xl shadow-[0px_2px_6px_0px_rgba(144,146,148,0.20)] p-5"
    >
      <span className="text-[#4D5154] text-[.8rem] uppercase font-bold">
        Course
      </span>

      <div className="mt-4">
        <button
          ref={triggerRef}
          className="bg-none w-full flex items-center gap-3 text-left bg-[#F5F5F5] p-4 border border-transparent rounded-[10px] px-3 py-4 cursor-pointer text-[#11141A] hover:border-[#E2E2E3]"
          aria-haspopup="listbox"
          aria-expanded={isToggle}
          onClick={handleToggle}
        >
          <span className="w-9.5 h-9.5 flex-none rounded-[10px] bg-[#CDDEFF] flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z"></path>
            </svg>
          </span>

          <span>
            <span className="text-[#11141A] font-bold">{courseSelected}</span>
          </span>

          <svg
            className="ml-auto"
            width={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
      </div>

      {/* Panel dropdown*/}
      {isToggle && (
        <div className="absolute h-65 z-20 top-[calc(100%+8px)] left-0 right-0 bg-card rounded-xl shadow-[0_10px_29px_8px_rgba(0,0,0,0.12)] border border-(#E9E9E9) p-2 max-h-100 overflow-auto">
          <ul
            role="listbox"
            aria-label="Course or retreat"
            className="flex flex-col gap-1"
          >
            {courses.map((course, index) => {
              return (
                <li
                  key={`${course.id}-${index}`}
                  role="option"
                  tabIndex={0}
                  aria-selected={course.id?.toString() === selectedId}
                  className="text-[1rem] lg:text-[1.125rem] w-full cursor-pointer p-3 rounded-xl font-bold transition-colors hover:bg-[#5655D7] hover:text-white"
                  onClick={() => onSelectCourse(course)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelectCourse(course);
                    }
                  }}
                >
                  {course.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseParticipationDropdown;
