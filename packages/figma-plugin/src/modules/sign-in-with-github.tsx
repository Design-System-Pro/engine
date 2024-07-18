import { Button } from "@ds-project/components";
import { useCallback, useEffect } from "react";
import { config } from "../config";
import { useGithub } from "./github";

export function SignInWithGithub() {
  const { setToken, isReady, listRepositories } = useGithub();

  const initSignIn = useCallback(() => {
    // Announce intention to authenticate and grab the read and write keys
    fetch(`${config.AUTH_API_HOST}/api/auth/figma/init`, { method: "POST" })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // Opens the GitHub authentication page
        window.open(`${config.AUTH_API_HOST}/auth/figma?key=${data.writeKey}`);

        return data.readKey;
      })
      .then((readKey) => {
        // Polls for the authentication token
        const interval = setInterval(() => {
          fetch(`${config.AUTH_API_HOST}/api/auth/figma/read`, {
            method: "POST",
            body: JSON.stringify({ readKey }),
          })
            .then((data) => data.json())
            .then(({ token }) => {
              if (token) {
                setToken?.(token);
                parent.postMessage(
                  { pluginMessage: { type: "store-github-token", token } },
                  "https://www.figma.com"
                );
                clearInterval(interval);
              }
            })
            .catch(() => console.error("Error polling for GitHub token."));
        }, 1000); // Poll every second
      })
      .catch(() => {
        console.error("Error initializing GitHub authentication.");
      });
  }, []);

  useEffect(() => {
    if (!listRepositories) {
      console.log("Github module not available");
      return;
    }

    listRepositories().then((result) => {
      console.log("gh result", { result });
    });
  }, []);

  const logout = useCallback(() => {
    console.warn("Logout not yet implemented");
  }, []);

  return isReady ? (
    <Button onClick={logout}>Logout</Button>
  ) : (
    <Button onClick={initSignIn}>Sign in with GitHub</Button>
  );
}
