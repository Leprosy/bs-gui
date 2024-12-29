import { createContext, PropsWithChildren, useState } from "react";
import getClasses from "../helpers/getClasses";
import { HTMLBlockStructure } from "../types";

type MainState = {
  classNames: string[];
  HTMLBlockTree: HTMLBlockStructure;
  push: (item: HTMLBlockStructure, id?: string) => void;
  remove: (id: string) => void;
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

  const push = (item: HTMLBlockStructure, id?: string) => {
    console.log("MainContext.push", { HTMLBlockTree, item, id });
    const newHTMLBlockTree = JSON.parse(JSON.stringify(HTMLBlockTree));

    if (id == undefined) {
      console.log("MainContext.push: id undefined");
      item.parentId = newHTMLBlockTree.id;
      newHTMLBlockTree.push(item);
    } else {
      const block = find(id, newHTMLBlockTree);

      if (block !== null) {
        console.log("MainContext.push: push into block", block);
        item.parentId = id;
        block.children.push(item);
      }
    }

    setHTMLBlockTree(newHTMLBlockTree);
  };

  const remove = (id: string): void => {
    console.log("MainContext.remove: removing", id);
    const newHTMLBlockTree = JSON.parse(JSON.stringify(HTMLBlockTree));
    const block = find(id, newHTMLBlockTree);

    if (block && block.parentId) {
      const parent = find(block.parentId, newHTMLBlockTree);

      if (parent) {
        parent.children = parent.children.filter((item: HTMLBlockStructure) => item.id != id);
      }
    }

    console.log("new tree", newHTMLBlockTree);
    setHTMLBlockTree(newHTMLBlockTree);
  };

  const find = (id: string, tree: HTMLBlockStructure): HTMLBlockStructure | null => {
    if (tree.id === id) return tree;

    let result = null;

    for (let i = 0; i < tree.children.length; ++i) {
      const data = find(id, tree.children[i]);

      if (data) {
        console.log("parent?", tree);
        result = data;
        break;
      }
    }

    return result;
  };

  return <MainContext.Provider value={{ classNames, HTMLBlockTree, push, remove }}>{children}</MainContext.Provider>;
}
