"use client";

import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  className?: string;
}

const CopyableValue = ({ value, className }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.log(error);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1100);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "group inline-flex items-center gap-1.5 max-lg:min-h-11 cursor-pointer rounded bg-transparent border-none p-0 text-left hover:text-[#5655D7]",
        copied && "text-[#5655D7] font-bold",
        className,
      )}
    >
      {copied ? (
        "Copied ✓"
      ) : (
        <>
          {value}
          <MdContentCopy size={13} className="opacity-0 transition-opacity group-hover:opacity-70" />
        </>
      )}
    </button>
  );
};

export default CopyableValue;
