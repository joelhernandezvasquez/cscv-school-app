import React, { createContext, useState } from "react";

export const EventFormContext = createContext<{
  course: number | null;
  setCourse: (courseId: number) => void;
}>({
  course: null,
  setCourse: () => {},
});

export const EventFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [course, setCourse] = useState<number | null>(null);
  return (
    <EventFormContext.Provider value={{ course, setCourse }}>
      {children}
    </EventFormContext.Provider>
  );
};