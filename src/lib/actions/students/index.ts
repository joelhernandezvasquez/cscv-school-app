import {
  CompletedCourse,
  PaginationData,
  PendingCourses,
  StudentProgress,
  Students,
  StudentsSummary,
} from "@/types";
import { getValidatedToken, pathId } from "../index";

export const getStudentSummary = async (): Promise<StudentsSummary> => {
  try {
    const token = await getValidatedToken();

    const summaryRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/student/summary`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return await summaryRequest.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
    console.log(error);
    throw new Error(
      "Unknown error occurred while getting the students summary",
    );
  }
};

export const fetchStudents = async (
  query: string,
  page?: string | number,
  sortBy?: string,
): Promise<Students[]> => {
  try {
    const token = await getValidatedToken();
    const studentRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/student/search?query=${encodeURIComponent(query)}&page=${encodeURIComponent(String(page))}&sortBy=${encodeURIComponent(String(sortBy))}`,
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

export const getStudentsPagination = async (): Promise<PaginationData> => {
  try {
    const token = await getValidatedToken();
    const paginationRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/student/pagination`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return await paginationRequest.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
    console.log(error);
    throw new Error(
      "Unknown error occurred while getting the students pagination",
    );
  }
};

export const validateStudentForm = (formData: FormData) => {
  let errors = {};

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const phoneNumber = formData.get("phoneNumber");

  if (!firstName) {
    errors = {
      ...errors,
      firstName: true,
    };
  }

  if (!lastName) {
    errors = {
      ...errors,
      lastName: true,
    };
  }

  if (!phoneNumber) {
    errors = {
      ...errors,
      phoneNumber: true,
    };
  }

  return errors;
};

export const fetchStudent = async (studentId: string): Promise<Students> => {
  try {
    const token = await getValidatedToken();

    const studentRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/student/${pathId(studentId)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return studentRequest.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
    console.log(error);
    throw new Error("Unknown error occurred while getting the student");
  }
};

export const getStudentProgress = async (
  studentId: string,
): Promise<StudentProgress> => {
  try {
    const token = await getValidatedToken();
    const studentProgressRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/student/${pathId(studentId)}/progress`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    const result = await studentProgressRequest.json();
    if (result.error) {
      return {
        totalCourses: 0,
        totalCoursesTaken: 0,
        coursesTakenByLevel: [],
      };
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(error.message);
    }
    console.log(error);
    throw new Error("Unknown error occurred while getting the student");
  }
};

export const getPendingCoursesList = async (
  studentId: string,
): Promise<PendingCourses[]> => {
  try {
    const token = await getValidatedToken();
    const pendingCoursesRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/student/${pathId(studentId)}/pending-courses`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return await pendingCoursesRequest.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
    console.log(error);
    throw new Error("Unknown error occurred while getting the student");
  }
};

export const getCompletedCoursesList = async (
  studentId: string,
): Promise<CompletedCourse[]> => {
  try {
    const token = await getValidatedToken();
    const completedCoursesRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/student/${pathId(studentId)}/complete-courses`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return await completedCoursesRequest.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
    console.log(error);
    throw new Error("Unknown error occurred while getting the courses");
  }
};
