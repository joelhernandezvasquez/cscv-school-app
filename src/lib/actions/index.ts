'use server'
import { auth } from "@/auth.config";
import { Session } from "next-auth";
import { refreshToken } from "./auth/login";

export const getValidatedToken = async () => {
    const session = await auth();
    let token = (session as Session & { token?: string; expiresAt?: string | number })?.token;

    // expiresAt comes from the backend's JWT `exp` claim, which is in seconds since epoch.
    const expiresAtSeconds = (session as { expiresAt?: string | number })?.expiresAt;
    const expiresAt = expiresAtSeconds
        ? Number(expiresAtSeconds) * 1000
        : 0;

    if (expiresAt && Date.now() > expiresAt) {
        token = await refreshToken(session?.user?.id as string);
        return token;
    }
    return token;
}