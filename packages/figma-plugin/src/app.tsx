import "@ds-project/components/globals.css";
import "react-json-view-lite/dist/index.css";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@ds-project/components";
import { Octokit } from "octokit";

function App() {
  const [tokens, setTokens] = useState(null);
  const [tokensHref, setTokensHref] = useState<string>();
  const [writeKey, setWriteKey] = useState<string>();
  const [readKey, setReadKey] = useState<string>();
  const [githubToken, setGithubToken] = useState<string>();

  console.log({ writeKey, readKey });

  useEffect(() => {
    if (tokens) {
      setTokensHref(
        URL.createObjectURL(
          new Blob([JSON.stringify(tokens, null, 2)], { type: "text/json" })
        )
      );
    }
  }, [tokens]);

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "ui-ready" } }, "*");
  }, []);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.pluginMessage.type === "export-design-token-json") {
        const tokens = event.data.pluginMessage.tokens;
        console.log({ tokens });
        setTokens(tokens);
      }
    });
  }, []);

  useEffect(() => {
    fetch("https://localhost:3000/api/auth/figma/init", { method: "POST" })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setWriteKey(data.writeKey);
        setReadKey(data.readKey);
      })
      .catch((e) => {
        console.error("Error init", { e });
      });
  }, []);

  // useEffect(() => {
  //   const readInterval = setInterval(() => {
  //     fetch("https://localhost:3000/api/auth/figma/read", {
  //       method: "DELETE",
  //       body: JSON.stringify({ key: readKey }),
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //       })
  //       .then(({ token }) => {
  //         setGithubToken(token);
  //         clearInterval(readInterval);
  //       })
  //       .catch((e) => {
  //         console.error("Error read", { e });
  //       });
  //   }, 1000); // every 1 second
  // }, []);

  const readToken = useCallback(() => {
    if (!readKey) {
      console.error("no read key available");
      return;
    }

    fetch("https://localhost:3000/api/auth/figma/read", {
      method: "DELETE",
      body: JSON.stringify({ key: readKey }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(({ token }) => {
        setGithubToken(token);
      })
      .catch((e) => {
        console.error("Error read", { e });
      });
  }, [readKey]);

  console.log({ githubToken });

  const fetchRepos = useCallback(async () => {
    const octokit = new Octokit({
      auth: githubToken,
    });

    await octokit.request("GET /users/{username}/repos", {
      username: "tomasfrancisco",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  }, [githubToken]);

  return (
    <main>
      <header>
        <h1>DS-Project</h1>
      </header>
      {tokens ? (
        <JsonView
          data={tokens}
          shouldExpandNode={allExpanded}
          style={defaultStyles}
        />
      ) : null}
      <Button asChild>
        <a href={tokensHref} download="tokens.json">
          Save Tokens
        </a>
      </Button>
      <Button
        onClick={() => {
          window.open(`https://localhost:3000/authenticate?key=${writeKey}`);
        }}
      >
        Login with GitHub
      </Button>
      <Button onClick={readToken}>Read GitHub Token</Button>
      <Button onClick={fetchRepos}>Fetch Repos</Button>
    </main>
  );
}

export default App;
