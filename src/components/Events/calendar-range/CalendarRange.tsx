"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar";
import "react-day-picker/style.css";

interface Props{
  onChange:(range:DateRange|undefined) => void,
  rangeDates?:DateRange,
  captionDropdown?:"label" | "dropdown" | "dropdown-months" | "dropdown-years" | undefined
}

export function CalendarRange({onChange,rangeDates,captionDropdown}:Props) {

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>
  ( rangeDates ? rangeDates : undefined
  );

  const onSelection = (range:DateRange|undefined) =>{
    setDateRange(range);
    onChange(range)
  }

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={(range) => onSelection(range)}
      numberOfMonths={1}
      className="rounded-md border p-4 mb-[3rem]  w-[330px]"
      captionLayout={captionDropdown}
    />
  );
}