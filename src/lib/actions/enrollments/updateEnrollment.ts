"use server";

import { EnrollmentEvent } from "@/types";
import { getValidatedToken, pathId } from "..";

export const updateEnrollment = async (
  enrollmentId: string,
  status: string,
): Promise<EnrollmentEvent> => {
  try {
    const token = await getValidatedToken();

    const enrollmentRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/enrollments/${pathId(enrollmentId)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      },
    );

    return await enrollmentRequest.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
    console.log(error);
    throw new Error(
      "Unknown error occurred while getting the enrollments event",
    );
  }
};
