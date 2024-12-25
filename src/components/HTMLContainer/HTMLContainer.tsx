// import style from "./style.module.css";

import { useContext } from "react";
import { useDrop } from "react-dnd";
import { dragTypes } from "../../constants/dragTypes";
import getUID from "../../helpers/getUID";
import { MainContext } from "../../context/Main";
import { HTMLBlockStructure } from "../../types";
import getTree from "../../helpers/getTree";

const HTMLContainer = () => {
  const mainData = useContext(MainContext);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: dragTypes.HTMLBlock,
      drop: (item: HTMLBlockStructure, monitor) => {
        if (monitor.isOver({ shallow: true })) {
          console.log("drop on htmlcontainer", item);
          const id = item.id || getUID();
          mainData.push({ id, label: item.label, tagName: item.tagName, children: [] });
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
    }),
    [mainData]
  );

  return (
    <div>
      <div
        ref={drop}
        id="content"
        className={`bg-success-subtle border p-2 rounded ${isOver ? "border-danger" : "border-black "}`}
        style={{ minHeight: 200 }}
      >
        {getTree(mainData.HTMLBlockTree)}
      </div>
    </div>
  );
};

export default HTMLContainer;
