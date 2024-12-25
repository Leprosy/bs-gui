import HTMLBlock from "../components/HTMLBlock/HTMLBlock";
import { HTMLBlockStructure } from "../types";

const getTree = (data: HTMLBlockStructure[]) =>
  data.map((item: HTMLBlockStructure) => (
    <HTMLBlock label={item.label} tagName={item.tagName} id={item.id}>
      {getTree(item.children)}
    </HTMLBlock>
  ));

export default getTree;
