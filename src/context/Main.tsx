import { createContext, PropsWithChildren, useState } from "react";
import getClasses from "../helpers/getClasses";
import { HTMLBlockStructure } from "../types";
import getUID from "../helpers/getUID";
import copyObj from "../helpers/copyObj";

type MainState = {
  classNames: string[];
  HTMLBlockTree: HTMLBlockStructure;
  push: (item: HTMLBlockStructure, id: string) => void;
  remove: (id: string) => void;
  drag: (id: string, into: string) => void;
};

const classNames = getClasses();

export const MainContext = createContext<MainState>({} as MainState);

export function MainProvider({ children }: PropsWithChildren) {
  const [HTMLBlockTree, setHTMLBlockTree] = useState<HTMLBlockStructure>({
    id: "#root",
    label: "#root",
    tagName: "div",
    children: [],
  });

  const drag = (id: string, into: string, tree: HTMLBlockStructure) => {
    console.log("MainContext.drag", { id, into });
    const dragged = copyObj(find(id, tree));

    if (dragged) {
      dragged.id = getUID();
      const pushedTree = push(dragged, into, tree);
      // console.log("MainContext.drag: new tree after push", pushedTree);
      const removedTree = remove(id, pushedTree);
      // console.log("MainContext.drag: new tree after remove", removedTree);
      return removedTree;
    }

    return tree;
  };

  const push = (item: HTMLBlockStructure, id: string, tree: HTMLBlockStructure): HTMLBlockStructure => {
    console.log("MainContext.push", { item, id });
    const block = find(id, tree);

    if (block !== null) {
      console.log("MainContext.push: push into block", block);
      item.parentId = id;
      block.children.push(item);
    }

    console.log("MainContext.push: new tree", tree);
    return tree;
  };

  const remove = (id: string, tree: HTMLBlockStructure): HTMLBlockStructure => {
    console.log("MainContext.remove: removing", { id });
    const block = find(id, tree);

    if (block && block.parentId) {
      const parent = find(block.parentId, tree);

      if (parent) {
        parent.children = parent.children.filter((item: HTMLBlockStructure) => item.id != id);
      }
    }

    console.log("MainContext.remove: new tree", tree);
    return tree;
  };

  const find = (id: string, tree: HTMLBlockStructure): HTMLBlockStructure | null => {
    if (tree.id === id) return tree;

    let result = null;

    for (let i = 0; i < tree.children.length; ++i) {
      const data = find(id, tree.children[i]);

      if (data) {
        result = data;
        break;
      }
    }

    return result;
  };

  return (
    <MainContext.Provider
      value={{
        classNames,
        HTMLBlockTree,
        push: (item: HTMLBlockStructure, id: string) => {
          setHTMLBlockTree(push(item, id, copyObj(HTMLBlockTree)));
        },
        remove: (id: string) => {
          setHTMLBlockTree(remove(id, copyObj(HTMLBlockTree)));
        },
        drag: (id: string, into: string) => {
          setHTMLBlockTree(drag(id, into, copyObj(HTMLBlockTree)));
        },
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
