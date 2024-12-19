// import style from "./style.module.css";

import { ReactElement, SyntheticEvent, useState } from "react";
import { useDrop } from "react-dnd";
import { dragTypes } from "../../constants/dragTypes";
import getUID from "../../helpers/getUID";

interface HTMLBlockProps {
  label: string;
  id: string;
}

const HTMLBlock = ({ label, id }: HTMLBlockProps) => {
  const [blocks, setBlocks] = useState<ReactElement[]>([]);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: dragTypes.Block,
      drop: (item, monitor) => {
        if (monitor.isOver({ shallow: true })) {
          console.log("drop on htmlblock", label, item);
          createHTMLBlock();
        } else {
          console.log("drop on htmlblock rejected", label, item);
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
    setBlocks([...blocks, <HTMLBlock label="SubBlock" id={getUID()} />]);
  };

  return (
    <div
      onClick={(ev: SyntheticEvent) => {
        console.log("block onclick", { label, blocks, ev });
        ev.stopPropagation();
      }}
      ref={drop}
      key={id}
      className={`bg-primary-subtle block border p-2 rounded ${
        isOver ? "border-danger" : "border-black "
      }`}
    >
      <h5>*{label}*</h5>
      {blocks}
    </div>
  );
};

export default HTMLBlock;
