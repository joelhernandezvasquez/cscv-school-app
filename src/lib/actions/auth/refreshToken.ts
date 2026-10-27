// Server-side only. Kept apart from login.ts, which is a client module that imports next-auth/react.

// The backend token is a JWT; its `exp` claim (seconds since epoch) is what getValidatedToken compares.
const getTokenExpiry = (token: string): number | undefined => {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString("utf8"),
    );
    return typeof payload.exp === "number" ? payload.exp : undefined;
  } catch {
    return undefined;
  }
};

export const refreshToken = async (
  id: string,
  currentToken?: string,
): Promise<{ token: string; expiresAt?: number } | undefined> => {
  try {
    const tokenRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token/${encodeURIComponent(id)}`,
      { headers: { Authorization: `Bearer ${currentToken}` } },
    );

    // A failed refresh returns an error body, which must never be used as the token.
    if (!tokenRequest.ok) return undefined;

    const body = await tokenRequest.json();
    const token = typeof body === "string" ? body : body?.token;
    if (typeof token !== "string" || !token) return undefined;

    return { token, expiresAt: getTokenExpiry(token) };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
