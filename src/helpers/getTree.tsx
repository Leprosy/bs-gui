import HTMLBlock from "../components/HTMLBlock/HTMLBlock";
import { HTMLBlockStructure } from "../types";

const getTree = (data: HTMLBlockStructure) => {
  console.log(data);

  return (
    <HTMLBlock label={data.label} tagName={data.tagName} id={data.id} classList={data.classList}>
      {data.children.map(function oaw(child: HTMLBlockStructure) {
        return getTree(child);
      })}
    </HTMLBlock>
  );
};

export default getTree;
