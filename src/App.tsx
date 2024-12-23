import { useState } from "react";
import HTMLContainer from "./components/HTMLContainer/HTMLContainer";
import HTMLBlock from "./components/HTMLBlock/HTMLBlock";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4">
          <h2>blocks</h2>

          <div className="d-flex flex-column gap-2" id="tools">
            {/* TODO: get this from a JSON  */}
            <HTMLBlock label="Basic div" tagName="div" />
            <HTMLBlock label="Paragraph" tagName="p" />
            <HTMLBlock label="test" tagName="div" classes={["foo", "bar"]} />
            <HTMLBlock label="too-much" tagName="span" classes={["foo", "bar", "oaw", "super", "taldo", "holy-crap"]} />
          </div>
        </div>

        <div className="col-12 col-md-8">
          <h2>layout</h2>

          <HTMLContainer />
        </div>
      </div>

      <hr />

      <div>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
