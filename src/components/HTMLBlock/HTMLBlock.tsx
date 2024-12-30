// import style from "./style.module.css";

import { PropsWithChildren, SyntheticEvent, useContext, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { dragTypes } from "../../constants/dragTypes";
import getUID from "../../helpers/getUID";
import SearchInput from "../SearchInput/SearchInput";
import { MainContext } from "../../context/Main";
import { HTMLBlockStructure } from "../../types";

interface HTMLBlockProps {
  label: string;
  tagName: string;
  classes?: string[];
  id?: string;
}

const HTMLBlock = ({ label, id, tagName, classes, children }: PropsWithChildren<HTMLBlockProps>) => {
  const isMounted = id != undefined;
  const isRoot = id == "#root";
  const [classList, setClassList] = useState<string[]>(classes || []);
  const mainData = useContext(MainContext);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dragTypes.HTMLBlock,
      item: { id, label, tagName },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [mainData]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: dragTypes.HTMLBlock,
      drop: (item: HTMLBlockStructure, monitor) => {
        if (monitor.isOver({ shallow: true }) && isMounted && item.id != id) {
          if (item.id) {
            console.log("Dropping existing htmlblock", item);
            mainData.drag(item.id, id);
          } else {
            console.log("Dropping new htmlblock", item);
            const newId = getUID();
            mainData.push({ id: newId, label: item.label, tagName: item.tagName, children: [] }, id);
          }
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
    }),
    [mainData]
  );

  const onClickHandler = (ev: SyntheticEvent) => {
    console.log("block onclick", { label, id, ev });
    ev.stopPropagation();
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
            {label} - mnt:{isMounted.toString()} - id:{id} - isDrag:{isDragging.toString()}
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
          <SearchInput label="Add class" data={mainData.classNames} onSelect={(value: string) => addClass(value)} />
        </div>
      </div>

      {isMounted ? (
        <div>
          {!isRoot ? (
            <div>
              <button onClick={() => mainData.remove(id)}>Remove</button>
            </div>
          ) : (
            ""
          )}
          <hr />
          {children}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HTMLBlock;
