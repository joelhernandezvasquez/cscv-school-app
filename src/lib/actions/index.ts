// Server-only helper. This module must NOT have a 'use server' directive: that would
// turn getValidatedToken into a public Server Action that returns the backend token
// to the browser. Import it only from server components and 'use server' actions.
import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";
import { authConfig } from "@/auth.config";
import { UserSession } from "@/types";
import { refreshToken } from "./auth/refreshToken";

// Reads the backend login response stored in the encrypted session JWT (token.data).
// The session exposed by auth()/api/auth/session no longer carries the token.
const getSessionData = async (): Promise<Partial<UserSession> | undefined> => {
  // Only pass the cookie header so a request Authorization header is never used as the session.
  const cookie = (await headers()).get("cookie") ?? "";

  // Auth.js uses the __Secure- cookie name over https and the plain name over http.
  for (const secureCookie of [true, false]) {
    const jwt = await getToken({
      req: { headers: { cookie } },
      secret: authConfig.secret,
      secureCookie,
    });
    if (jwt?.data) return jwt.data as Partial<UserSession>;
  }
  return undefined;
};

// Backend ids are integers. Rejecting anything else keeps ids that come from FormData or the
// URL from changing the backend path (e.g. "1/../..") or adding query parameters.
export const pathId = (value: unknown): string => {
  const id = String(value ?? "").trim();
  if (!/^\d+$/.test(id)) {
    throw new Error("Invalid id");
  }
  return id;
};

export const getValidatedToken = async () => {
  const data = await getSessionData();
  let token = data?.token;

  // expiresAt comes from the backend's JWT `exp` claim, which is in seconds since epoch.
  const expiresAtSeconds = data?.expiresAt;
  const expiresAt = expiresAtSeconds ? Number(expiresAtSeconds) * 1000 : 0;

  if (expiresAt && Date.now() > expiresAt) {
    token = (await refreshToken(pathId(data?.user?.id), token))?.token;
  }

  // Layout redirects don't stop page server components from running, so refuse here
  // rather than calling the backend with `Bearer undefined`. A plain Error is thrown
  // (not redirect()) because callers catch and rethrow, which would swallow the redirect.
  if (typeof token !== "string" || !token) {
    throw new Error("Unauthorized: no valid session token");
  }
  return token;
};
