"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar";
import "react-day-picker/style.css";

export function CalendarRange() {

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={(range) => setDateRange(range)}
      numberOfMonths={1}
      className="rounded-md border p-4  w-[330px]"
    />
  );
}