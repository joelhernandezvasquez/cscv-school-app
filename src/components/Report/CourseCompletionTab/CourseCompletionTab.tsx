"use client";

import { startTransition, ViewTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const tabBase =
  "relative border-none bg-transparent py-3 px-3.5 lg:py-2 rounded-lg text-[.85rem] whitespace-nowrap font-bold cursor-pointer transition-colors duration-200";
const tabPill =
  "absolute inset-0 -z-10 bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,.08)]";

const CourseCompletionTab = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const isToggle = searchParams.get("status") === "completed";

  const switchTab = (status: "completed" | "not-completed") =>
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("status", status);
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });

  return (
    <ul className="flex w-fit items-center gap-0.5 rounded-[10px] bg-[#F5F5F5] p-[3px] isolate">
      <li>
        <button
          className={cn(
            tabBase,
            !isToggle ? "text-[#11141A]" : "text-[#4D5154]",
          )}
          aria-pressed={!isToggle}
          onClick={() => isToggle && switchTab("not-completed")}
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
            Has not completed
          </span>
        </button>
      </li>
      <li>
        <button
          className={cn(
            tabBase,
            isToggle ? "text-[#11141A]" : "text-[#4D5154]",
          )}
          aria-pressed={isToggle}
          onClick={() => !isToggle && switchTab("completed")}
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
            Has completed
          </span>
        </button>
      </li>
    </ul>
  );
};

export default CourseCompletionTab;
