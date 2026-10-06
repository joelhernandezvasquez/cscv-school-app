"use client";

import { startTransition, ViewTransition } from "react";
import UseToggle from "@/hooks/UseToggle";
import { cn } from "@/lib/utils";

const tabBase =
  "relative border-none bg-transparent py-2 px-3.5 rounded-lg text-[.85rem] whitespace-nowrap font-bold cursor-pointer transition-colors duration-200";
const tabPill =
  "absolute inset-0 -z-10 bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,.08)]";

const CourseCompletionTab = () => {
  const { isToggle, handleToggle } = UseToggle();

  const switchTab = () => startTransition(() => handleToggle());

  return (
    <ul className="flex w-fit items-center gap-0.5 rounded-[10px] bg-[#F5F5F5] p-[3px] isolate">
      <li>
        <button
          className={cn(
            tabBase,
            !isToggle ? "text-[#11141A]" : "text-[#6B7280]",
          )}
          onClick={() => isToggle && switchTab()}
        >
          {!isToggle && (
            <ViewTransition
              name="course-completion-tab-pill"
              default="none"
              share="tab-pill"
            >
              <span className={tabPill} />
            </ViewTransition>
          )}
          <span style={{ viewTransitionName: "tab-label-not-completed" }}>
            Has Not Completed
          </span>
        </button>
      </li>
      <li>
        <button
          className={cn(
            tabBase,
            isToggle ? "text-[#11141A]" : "text-[#6B7280]",
          )}
          onClick={() => !isToggle && switchTab()}
        >
          {isToggle && (
            <ViewTransition
              name="course-completion-tab-pill"
              default="none"
              share="tab-pill"
            >
              <span className={tabPill} />
            </ViewTransition>
          )}
          <span style={{ viewTransitionName: "tab-label-completed" }}>
            Has Completed
          </span>
        </button>
      </li>
    </ul>
  );
};

export default CourseCompletionTab;
