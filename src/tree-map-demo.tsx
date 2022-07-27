import React from "react";
import { TreeMap } from "./components/tree-map";

const leaf = (s) => {
  return { size: s, name: `SIZE ${s}`, children: [] };
};
const data = {
  children: [
    leaf(1),
    leaf(1),
    leaf(2),
    {
      children: [
        { children: [leaf(4), { children: [leaf(1), leaf(1)] }, leaf(3)] },
        { children: [leaf(2)] },
        { children: [leaf(3), leaf(1), leaf(1)] },
      ],
    },
    leaf(5),
    {
      children: [
        leaf(2),
        leaf(2),
        leaf(1),
        { children: [leaf(3), leaf(1), leaf(2)] },
        leaf(2),
      ],
    },
  ],
};

export const TreeMapDemo = () => {
  return (
    <>
      <h1>TreeMap demo</h1>
      <TreeMap data={data} />
    </>
  );
};
