import { cache } from "react";
import { getValidatedToken } from "..";

export const getCompletionCourseList = async (query: string) => {
  try {
    const token = await getValidatedToken();
    const listRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/report/course-completion?query=${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return await listRequest.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
    console.log(error);
    throw new Error("Unknown error occurred while getting the students");
  }
};

const fetchPaginatedCompletionStatusCourseList = async (
  query: string,
  status: string,
  currentPage?: string | number,
  search = "",
) => {
  try {
    if (!query) {
      throw new Error(
        "Select a course before loading its participation report.",
      );
    }

    const token = await getValidatedToken();
    const params = new URLSearchParams({
      status,
      page: String(currentPage ?? 1),
    });
    let endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/report/${encodeURIComponent(query)}/course-completion`;
    if (search) {
      endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/report/${encodeURIComponent(query)}/course-completion/search`;
      params.set("search", search);
    }

    const listRequest = await fetch(`${endpoint}?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const responseBody = await listRequest.text();
    let responseData;

    try {
      responseData = JSON.parse(responseBody);
    } catch {
      throw new Error(
        `Course participation API returned a non-JSON response (${listRequest.status}) for ${new URL(endpoint).pathname}. Check that the backend route exists and NEXT_PUBLIC_SERVER_URL points to the API.`,
      );
    }

    if (!listRequest.ok) {
      const message =
        typeof responseData?.message === "string"
          ? responseData.message
          : `Course participation request failed (${listRequest.status}).`;
      throw new Error(message);
    }

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
    console.log(error);
    throw new Error("Unknown error occurred while getting the students");
  }
};

// Deduped per request so the table and the pagination share one backend call.
export const getPaginatedCompletionStatusCourseList = cache(
  fetchPaginatedCompletionStatusCourseList,
);
