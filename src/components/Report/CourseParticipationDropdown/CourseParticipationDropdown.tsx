"use client";
import { useState } from "react";
import UseToggle from "@/hooks/UseToggle";
import { Courses } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  courses: Courses[];
}

const CourseParticipationDropdown = ({ courses }: Props) => {
  const { isToggle, handleToggle } = UseToggle();
  const [courseSelected,setCourseSelected] = useState('Select A course or Retreat');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

   const onSelectCourse = (course:Courses) =>{
    setCourseSelected(course.name);
    const params = new URLSearchParams(searchParams);
      params.set('page','1');

    if(course.id){
      params.set('query', course.id.toString());
    }
    else{
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    handleToggle();
   }

  return (
    <section className="relative bg-white rounded-2xl shadow-[0px_2px_6px_0px_rgba(144,146,148,0.20)] p-5">
      <span className="text-[#4D5154] text-[.8rem] uppercase font-bold">
        Course - Retreat
      </span>

      <div className="mt-4">
        <button
          className="bg-none w-full flex items-center gap-3 text-left bg-[#F5F5F5] p-4 border border-transparent rounded-[10px] px-3 py-4 cursor-pointer text-[#11141A] hover:border-[#E2E2E3]"
          onClick={handleToggle}
        >
          <span className="w-9.5 h-9.5 flex-none rounded-[10px] bg-[#CDDEFF] flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
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
            stroke-width="2"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
      </div>

      {/* Panel dropdown*/}
      {isToggle && (
        <div className="absolute h-65 z-20 top-[calc(100%+8px)] left-0 right-0 bg-card rounded-xl shadow-[0_10px_29px_8px_rgba(0,0,0,0.12)] border border-(#E9E9E9) p-2 max-h-100 overflow-auto">
          <ul className="flex flex-col gap-1">
            {courses.map((course) => {
              return (
                <li key={course.id} className="text-[1rem] lg:text-[1.125rem] w-full cursor-pointer p-3 rounded-xl font-bold transition-colors hover:bg-[#5655D7] hover:text-white"
                onClick={() => onSelectCourse(course)}
                >
                    {course.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
};

export default CourseParticipationDropdown;
