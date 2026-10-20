"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

interface Props {
  initialValue: string;
}

const CourseSearchBar = ({ initialValue }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [value, setValue] = useState(initialValue);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmedTerm = term.trim();

    params.set("page", "1");
    if (trimmedTerm) {
      params.set("search", trimmedTerm);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <div
      className={
        "flex min-w-0 max-sm:basis-full flex-1 items-center gap-2 py-2 px-3 rounded-[.625rem] bg-[#F5F5F5] min-h-11 focus-within:ring-2 focus-within:ring-[#5655D7] lg:min-h-0"
      }
    >
      <input
        className={
          "min-w-0 bg-transparent border-none outline-none flex-1 text-[.9rem] text-[#11141A] placeholder:text-[#4D5154]"
        }
        type="text"
        id="search"
        name="search"
        aria-label="Search by name, email or phone"
        placeholder={"Search name, email, phone…"}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <svg
        className="flex-none"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.25 2.5C4.62665 2.5 2.5 4.62665 2.5 7.25C2.5 9.87335 4.62665 12 7.25 12C9.87335 12 12 9.87335 12 7.25C12 4.62665 9.87335 2.5 7.25 2.5ZM1.5 7.25C1.5 4.07436 4.07436 1.5 7.25 1.5C10.4256 1.5 13 4.07436 13 7.25C13 10.4256 10.4256 13 7.25 13C4.07436 13 1.5 10.4256 1.5 7.25Z"
          fill="#2E3135"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.6089 10.6089C10.8042 10.4137 11.1208 10.4137 11.3161 10.6089L14.3536 13.6464C14.5488 13.8417 14.5488 14.1583 14.3536 14.3536C14.1583 14.5488 13.8417 14.5488 13.6464 14.3536L10.6089 11.3161C10.4137 11.1208 10.4137 10.8042 10.6089 10.6089Z"
          fill="#2E3135"
        />
      </svg>
    </div>
  );
};

export default CourseSearchBar;
