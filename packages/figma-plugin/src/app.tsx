import "@ds-project/components/globals.css";
import "react-json-view-lite/dist/index.css";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import { useEffect, useState } from "react";
import { Button } from "@ds-project/components";

function App() {
  const [tokens, setTokens] = useState(null);
  const [tokensHref, setTokensHref] = useState<string>();

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
    </main>
  );
}

export default App;
