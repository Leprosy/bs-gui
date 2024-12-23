// import style from "./style.module.css";

import { ReactElement, SyntheticEvent, useContext, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { dragTypes } from "../../constants/dragTypes";
import getUID from "../../helpers/getUID";
import SearchInput from "../SearchInput/SearchInput";
import { MainContext } from "../../context/Main";

interface HTMLBlockProps {
  label: string;
  tagName: string;
  classes?: string[];
  id?: string;
}

interface HTMLBlockType {
  id: string;
}

const HTMLBlock = ({ label, id, tagName, classes }: HTMLBlockProps) => {
  const isMounted = id != undefined;
  const [blocks, setBlocks] = useState<ReactElement[]>([]);
  const [classList, setClassList] = useState<string[]>(classes || []);
  const { classNames } = useContext(MainContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragTypes.HTMLBlock,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: dragTypes.HTMLBlock,
      drop: (item: HTMLBlockType, monitor) => {
        if (monitor.isOver({ shallow: true }) && isMounted && item.id != id) {
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

  const onClickHandler = (ev: SyntheticEvent) => {
    console.log("block onclick", { label, id, blocks, ev });
    ev.stopPropagation();
  };

  const createHTMLBlock = () => {
    console.log("block was", blocks);
    setBlocks([...blocks, <HTMLBlock label="SubBlock" id={getUID()} classes={[]} />]);
  };

  const addClass = (className: string) => {
    console.log("adding", className);
    const newList = new Set(classList);
    newList.add(className);
    setClassList([...newList]);
  };

  const removeClass = (className: string) => {
    console.log("removing", className);
    setClassList(classList.filter((cls: string) => cls != className));
  };

  return (
    <div
      onClick={onClickHandler}
      ref={(node) => drag(drop(node))}
      key={id}
      className={`bg-primary-subtle block border p-2 d-flex flex-column rounded ${
        isOver ? "border-danger" : "border-black "
      }`}
    >
      <div>
        <p>
          <strong>
            {label} - mnt:{isMounted.toString()} - id:{id}
          </strong>
          <br />
          <small>{tagName}</small>
        </p>
      </div>

      <div>
        <p>ClassList</p>
        <div>
          {classList.length > 0 ? (
            <div className="d-flex flex-wrap gap-2 mb-3">
              {classList.map((el: string) => (
                <span className="d-flex gap-1 badge text-bg-primary">
                  {el}{" "}
                  <span role="button" onClick={() => removeClass(el)}>
                    x
                  </span>
                </span>
              ))}
            </div>
          ) : (
            ""
          )}
          <SearchInput label="Add class" data={classNames} onSelect={(value: string) => addClass(value)} />
        </div>
      </div>

      {isMounted ? (
        <div>
          <hr />
          {blocks}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HTMLBlock;
