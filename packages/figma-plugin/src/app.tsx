import { useRef, useEffect } from "react";
import logoPng from "./assets/logo.png";
import logoSvg from "./assets/logo.svg?raw";
import "./App.sass";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const onCreate = () => {
    const count = Number(inputRef.current?.value || 0);
    parent.postMessage(
      { pluginMessage: { type: "export-design-token-json", count } },
      "*"
    );
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <main>
      <header>
        <img src={logoPng} />
        &nbsp;
        <img src={`data:image/svg+xml;utf8,${logoSvg}`} />
        <h2>Hello You 😎</h2>
      </header>
      <section>
        <input id="input" type="number" min="0" ref={inputRef} value={10} />
        <label htmlFor="input">Make Rectangles 🧱</label>
      </section>
      <footer>
        <button className="brand" onClick={onCreate}>
          Create
        </button>
        <button onClick={onCancel}>Cancel</button>
      </footer>
    </main>
  );
}

export default App;
