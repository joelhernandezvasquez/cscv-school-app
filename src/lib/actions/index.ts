import { auth } from "@/auth.config";
import { Session } from "next-auth";
import { refreshToken } from "./auth/login";

export const getValidatedToken = async () => {
    const session = await auth();
    let token = (session as Session & { token?: string; expiresAt?: string | number })?.token;

    const expiresAt = (session as { expiresAt?: string | number })?.expiresAt
        ? new Date((session as { expiresAt?: string | number }).expiresAt!).getTime()
        : 0;

    if (expiresAt && Date.now() > expiresAt) {
        token = await refreshToken(session?.user?.id as string);
        return token;
    }
    return token;
}