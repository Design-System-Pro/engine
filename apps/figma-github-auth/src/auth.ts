import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { setGhToken } from "./lib/store";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    jwt: async ({ token, account }) => {
      // Stores the GitHub access token so it can be used to make GitHub API calls
      if (account?.access_token) {
        await setGhToken(account.access_token);
      }

      return Promise.resolve(token);
    },
  },
});
