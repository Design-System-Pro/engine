import "@ds-project/components/globals.css";
import "react-json-view-lite/dist/index.css";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@ds-project/components";
import { Octokit } from "octokit";
import { SignInWithGithub } from "./modules/sign-in-with-github";
import { useGithub } from "./modules/github";

function App() {
  const [tokens, setTokens] = useState(null);
  const [tokensHref, setTokensHref] = useState<string>();
  const { setToken } = useGithub();

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
      switch (event.data.pluginMessage.type) {
        case "export-design-token-json": {
          const tokens = event.data.pluginMessage.tokens;
          setTokens(tokens);
          break;
        }

        case "github-token": {
          console.log("got the github token", event.data.pluginMessage.token);
          setToken(event.data.pluginMessage.token);
          break;
        }
      }
    });
  }, []);

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
      <SignInWithGithub />
    </main>
  );
}

export default App;
