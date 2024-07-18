import { Button } from "@ds-project/components";
import { useCallback, useEffect, useState } from "react";
import { config } from "../config";
import { Octokit } from "octokit";

export function SignInWithGithub() {
  const [githubToken, setGithubToken] = useState<string>();

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
                setGithubToken(token);
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
    if (!githubToken) {
      console.log("No token found. Skipping GitHub call.");
      return;
    }

    const octokit = new Octokit({
      auth: githubToken,
    });

    octokit
      .request("GET /users/{username}/repos", {
        username: "tomasfrancisco",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((result) => {
        console.log("gh result", { result });
      });
  }, [githubToken]);

  return githubToken ? (
    <Button>Logout</Button>
  ) : (
    <Button onClick={initSignIn}>Sign in with GitHub</Button>
  );
}
