// import style from "./style.module.css";

import { useDrag } from "react-dnd";
import { dragTypes } from "../../constants/dragTypes";
import getUID from "../../helpers/getUID";

interface BlockProps {
  label: string;
}

const Block = ({ label }: BlockProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragTypes.Block,
    item: { id: "block" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      key={getUID()}
      ref={drag}
      className="block border border-black bg-primary-subtle"
      style={{ opacity: isDragging ? "0.5" : "1" }}
    >
      <h5>{label}</h5>
    </div>
  );
};

export default Block;
