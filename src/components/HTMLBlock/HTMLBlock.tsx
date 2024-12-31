// import style from "./style.module.css";

import { PropsWithChildren, SyntheticEvent, useContext, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { dragTypes } from "../../constants/dragTypes";
import getUID from "../../helpers/getUID";
import SearchInput from "../SearchInput/SearchInput";
import { MainContext } from "../../context/Main";
import { HTMLBlockStructure } from "../../types";
import ToggleContainer from "../ToggleContainer/ToggleContainer";

interface HTMLBlockProps {
  label: string;
  tagName: string;
  classList?: string[];
  id?: string;
}

const HTMLBlock = ({ label, id, tagName, classList, children }: PropsWithChildren<HTMLBlockProps>) => {
  console.log(classList);
  const isMounted = id != undefined;
  const isRoot = id == "#root";
  const [newClassList, setNewClassList] = useState<string[]>(classList || []);
  const mainData = useContext(MainContext);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dragTypes.HTMLBlock,
      item: { id, label, tagName, classList: newClassList },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [mainData, newClassList]
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
            mainData.push(
              { id: newId, label: item.label, tagName: item.tagName, classList: item.classList, children: [] },
              id
            );
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
    const newList = new Set(newClassList);
    newList.add(className);
    setNewClassList([...newList]);
  };

  const removeClass = (className: string) => {
    console.log("removing", className);
    setNewClassList(newClassList.filter((cls: string) => cls != className));
  };

  const getClass = () => {
    const nodeClass = newClassList.map((cls: string) => cls);
    const baseClass = "block border p-2 rounded";
    return isMounted
      ? `${nodeClass} ${baseClass} bg-secondary-subtle ${isOver ? "border-danger" : "border-black "}`
      : `${baseClass} bg-primary-subtle border-black`;
  };

  return (
    <div onClick={onClickHandler} ref={(node) => drag(drop(node))} key={id} className={getClass()}>
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-column mb-2">
          {!isMounted ? <strong>{label}</strong> : ""}
          <p>
            <small className="badge text-bg-dark">
              {tagName}
              {newClassList.map((item: string) => `.${item}`)}
            </small>
          </p>
        </div>

        {!isRoot && isMounted ? (
          <p>
            <span className="badge text-bg-dark" role="button" onClick={() => mainData.remove(id)}>
              x
            </span>
          </p>
        ) : (
          ""
        )}
      </div>

      <div>
        <ToggleContainer label="Classes" startVisible={!isMounted}>
          {newClassList.length > 0 ? (
            <div className="d-flex flex-wrap gap-2 mb-3">
              {newClassList.map((el: string) => (
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
          <SearchInput label="Add classes" data={mainData.classNames} onSelect={(value: string) => addClass(value)} />
        </ToggleContainer>
      </div>

      {isMounted ? children : ""}
    </div>
  );
};

export default HTMLBlock;
