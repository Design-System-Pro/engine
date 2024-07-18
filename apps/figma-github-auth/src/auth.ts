import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { setKey } from "./app/authenticate/set-key";
import { writeToken } from "./app/redirect-figma/write-token";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      // when user comes back after SignIn, we make sure to save the accessToken from
      // the logged user, otherwise it would be discarded. We need to make API calls to Github API
      // on behalf of the logged user, so here we persist the token, since its gonna be needed.
      if (user && account && account.provider === "github") {
        // token.username = profile.login; // save the github username
        // token.githubAccessToken: account.accessToken, // get the github accessToken from the user who signed in
        // token.randomStuff = 'anything you want';

        if (account.access_token) {
          await writeToken(account.access_token);
        }
      }

      return Promise.resolve(token);
    },
  },
});
