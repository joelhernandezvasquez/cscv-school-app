import NextAuth, { CredentialsSignin, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserSession } from "./types";
import { refreshToken } from "./lib/actions/auth/refreshToken";

class RateLimitedError extends CredentialsSignin {
  code = "rate_limited";
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.data = user;
        return token;
      }

      // The session cookie outlives the backend token, so refresh it once it expires and
      // end the session if that fails. Returning null clears the session.
      const data = token.data as Partial<UserSession> | undefined;
      const expiresAt = data?.expiresAt ? Number(data.expiresAt) * 1000 : 0;
      if (data && expiresAt && Date.now() > expiresAt) {
        const refreshed = await refreshToken(String(data.user?.id), data.token);
        if (!refreshed) return null;
        token.data = {
          ...data,
          token: refreshed.token,
          expiresAt: refreshed.expiresAt ?? data.expiresAt,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Expose only non-sensitive user fields. The backend token stays inside the
      // encrypted JWT cookie and is read server-side by getValidatedToken().
      const data = token.data as UserSession | undefined;
      const user = data?.user
        ? {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          }
        : undefined;
      return { user, expires: session.expires } as never;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          },
        );

        // A failed login (401 etc.) returns a JSON error body that would otherwise be
        // truthy and be issued a session, so only accept a successful, well-formed response.
        if (res.status === 429) {
          throw new RateLimitedError();
        }
        if (!res.ok) {
          return null;
        }

        const user: UserSession = await res.json().catch(() => null);

        if (!user?.token || !user.user?.id) {
          return null;
        }

        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
