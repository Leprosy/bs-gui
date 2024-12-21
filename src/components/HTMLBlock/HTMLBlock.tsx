// import style from "./style.module.css";

import { ReactElement, SyntheticEvent, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { dragTypes } from "../../constants/dragTypes";
import getUID from "../../helpers/getUID";

interface HTMLBlockProps {
  label: string;
  id: string;
}

const HTMLBlock = ({ label, id }: HTMLBlockProps) => {
  const [blocks, setBlocks] = useState<ReactElement[]>([]);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragTypes.HTMLBlock,
    item: { id: "block" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [dragTypes.Block, dragTypes.HTMLBlock],
      drop: (item, monitor) => {
        if (monitor.isOver({ shallow: true })) {
          console.log("drop on htmlblock", {
            label,
            item,
            type: monitor.getItemType(),
          });
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
      ref={(node) => drag(drop(node))}
      key={id}
      className={`bg-primary-subtle block border p-2 rounded ${
        isOver ? "border-danger" : "border-black "
      }`}
    >
      <h5>
        {label}/{id} - {isDragging.toString()}
      </h5>
      {blocks}
    </div>
  );
};

export default HTMLBlock;
