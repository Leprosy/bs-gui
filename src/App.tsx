import { useContext } from "react";
import HTMLBlock from "./components/HTMLBlock/HTMLBlock";
import { MainContext } from "./context/Main";
import getTree from "./helpers/getTree";

function App() {
  const mainData = useContext(MainContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4">
          <h2>blocks</h2>

          <div className="d-flex flex-column gap-2" id="tools">
            {/* TODO: get this from a JSON  */}
            <HTMLBlock label="Basic div" tagName="div" />
            <HTMLBlock label="Paragraph" tagName="p" />
            <HTMLBlock label="test" tagName="div" classList={["foo", "bar"]} />
            <HTMLBlock
              label="too-much"
              tagName="span"
              classList={["foo", "bar", "oaw", "super", "taldo", "holy-crap"]}
            />
          </div>
        </div>

        <div className="col-12 col-md-8">
          <h2>layout</h2>

          {getTree(mainData.HTMLBlockTree)}
        </div>
      </div>
    </div>
  );
}

export default App;
