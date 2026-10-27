"use server";

import { getValidatedToken, pathId } from "..";

export const completeEvent = async (eventId: number) => {
  try {
    const token = await getValidatedToken();

    const request = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${pathId(eventId)}/complete`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
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
      return response;
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
