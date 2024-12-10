import { useState } from "react";
import Search from "./components/Search";
import getClasses from "./helpers/getClasses";

function App() {
  const [count, setCount] = useState(0);
  const classNames = getClasses();

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-4">
          <h2>tools</h2>
          <div className="d-flex flex-column gap-2" id="tools"></div>
          <Search label="Class" data={classNames} />
        </div>

        <div className="col-12 col-md-8">
          <h2>content</h2>
          <div id="content"></div>
          {/*  onDrop="dropHandler(event)" ondragover="dragoverHandler(event)"
          ondragleave="dragleaveHandler(event)"></div> --> */}
        </div>
      </div>

      <hr />

      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
