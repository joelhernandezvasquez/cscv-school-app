import { signIn } from "next-auth/react";

export type LoginResult = { ok: true } | { ok: false; message: string };

// The backend is called once, from Auth.js's authorize() on the server, so the password
// is sent a single time and backend error text never reaches the form.
export const signInUser = async (
  email: string,
  password: string,
): Promise<LoginResult> => {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.ok && !result.error) return { ok: true };

  if (result?.code === "rate_limited") {
    return {
      ok: false,
      message: "Too many login attempts. Please wait a few minutes and try again.",
    };
  }
  return { ok: false, message: "Invalid email or password." };
};
