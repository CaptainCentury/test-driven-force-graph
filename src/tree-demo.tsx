import React from "react";
import { TreeGraph } from "./components/tree-graph";

const leaf = { children: [] };
const data = {
  children: [
    leaf,
    leaf,
    leaf,
    {
      children: [
        { children: [leaf, { children: [leaf, leaf] }, leaf] },
        { children: [leaf] },
        { children: [leaf, leaf, leaf] },
      ],
    },
    leaf,
    { children: [leaf, leaf, leaf, { children: [leaf, leaf, leaf] }, leaf] },
  ],
};

export const TreeDemo = () => {
  return (
    <>
      <h1>TreeGraph demo</h1>
      <TreeGraph data={data} />
    </>
  );
};
