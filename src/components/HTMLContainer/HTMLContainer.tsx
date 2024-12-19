// import style from "./style.module.css";

import { ReactElement, useState } from "react";
import { useDrop } from "react-dnd";
import HTMLBlock from "../HTMLBlock/HTMLBlock";
import { dragTypes } from "../../constants/dragTypes";
import getUID from "../../helpers/getUID";

const HTMLContainer = () => {
  const [blocks, setBlocks] = useState<ReactElement[]>([]);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: dragTypes.Block,
      drop: (item, monitor) => {
        if (monitor.isOver({ shallow: true })) {
          console.log("drop on htmlcontainer", item);
          createHTMLBlock();
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
    }),
    [blocks]
  );

  const createHTMLBlock = () => {
    console.log("block was", blocks);
    setBlocks([...blocks, <HTMLBlock label={"Block"} id={getUID()} />]);
  };

  return (
    <div>
      <p onClick={() => createHTMLBlock()}>Create block</p>
      <div
        ref={drop}
        id="content"
        className={`bg-success-subtle block border p-2 rounded ${
          isOver ? "border-danger" : "border-black "
        }`}
        style={{ minHeight: 200 }}
      >
        {blocks}
      </div>
    </div>
  );
};

export default HTMLContainer;
