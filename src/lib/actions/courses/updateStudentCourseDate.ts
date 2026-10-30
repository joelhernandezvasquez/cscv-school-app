"use server";

import { CompletedCourseActionState } from "@/types";
import { getValidatedToken, pathId } from "..";

export const updateStudentCourseDate = async (
  previousState: CompletedCourseActionState,
  formData: FormData,
): Promise<CompletedCourseActionState> => {
  const courseId = formData.get("course-id");
  const studentId = formData.get("student-id");

  try {
    // Parsed inside the try so a malformed value returns an error state instead of throwing.
    const courseDate = JSON.parse(String(formData.get("courseDate") ?? "null"));
    const completedAt = courseDate?.to ?? courseDate?.from;

    if (!completedAt) {
      return {
        success: false,
        message: "Please pick a completion date.",
      };
    }

    const token = await getValidatedToken();

    const request = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/student/${pathId(studentId)}/update-student-course-date`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: Number(pathId(courseId)),
          completedAt: String(completedAt),
        }),
      },
    );

    if (!request.ok) {
      console.log(request);
      return {
        success: false,
        message: `Server error: ${request.statusText}`,
      };
    }

    const response = await request.json();
    if (response) {
      return {
        success: true,
        message: "Date has been updated.",
      };
    }

    return {
      success: false,
      message: "No data returned from server",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};
