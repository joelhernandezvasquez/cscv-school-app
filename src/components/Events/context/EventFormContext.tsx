import React, { createContext, useState } from "react";

export const EventFormContext = createContext<{
  course: string | null;
  setCourse: (course: string) => void;
}>({
  course: null,
  setCourse: () => {},
});

export const EventFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [course, setCourse] = useState<string | null>(null);
  return (
    <EventFormContext.Provider value={{ course, setCourse }}>
      {children}
    </EventFormContext.Provider>
  );
};