"use server";

import { Students } from "@/types";
import { getValidatedToken } from "..";

export const searchStudents = async (
  query: string,
  eventId: number,
): Promise<Students[]> => {
  try {
    const token = await getValidatedToken();
    const studentRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/enrollments/search/${eventId}?query=${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return await studentRequest.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
    console.log(error);
    throw new Error("Unknown error occurred while getting the students");
  }
};
