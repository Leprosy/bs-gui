import { createContext, PropsWithChildren, useState } from "react";
import getClasses from "../helpers/getClasses";
import { HTMLBlockStructure } from "../types";

type MainState = {
  classNames: string[];
  HTMLBlockTree: HTMLBlockStructure[];
  push: (item: HTMLBlockStructure, id?: string) => void;
};

export const MainContext = createContext<MainState>({} as MainState);

export function MainProvider({ children }: PropsWithChildren) {
  const classNames = getClasses();
  const [HTMLBlockTree, setHTMLBlockTree] = useState<HTMLBlockStructure[]>([]);

  const push = (item: HTMLBlockStructure, id?: string) => {
    console.log("MainContext.push", { HTMLBlockTree, item, id });
    const newHTMLBlockTree = JSON.parse(JSON.stringify(HTMLBlockTree));

    if (id == undefined) {
      newHTMLBlockTree.push(item);
    } else {
      const block = find(id, newHTMLBlockTree);

      if (block !== null) {
        block.children.push(item);
      }
    }

    setHTMLBlockTree(newHTMLBlockTree);
  };

  const find = (id: string, tree: HTMLBlockStructure[]): HTMLBlockStructure | null => {
    if (tree.length === 0) return null;

    for (let i = 0; i < tree.length; ++i) {
      const item = tree[i];
      const result = _find(id, item);

      if (result != null) {
        return result;
      }
    }

    return null;
  };

  const _find = (id: string, item: HTMLBlockStructure) => {
    if (item.id == id) return item;
    let result = null;

    item.children?.forEach((subItem: HTMLBlockStructure) => {
      const data = _find(id, subItem);
      if (data) result = data;
    });

    return result;
  };

  return <MainContext.Provider value={{ classNames, HTMLBlockTree, push }}>{children}</MainContext.Provider>;
}
