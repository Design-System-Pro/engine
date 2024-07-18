import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { GithubProvider } from "./modules/github";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GithubProvider>
      <App />
    </GithubProvider>
  </React.StrictMode>
);
