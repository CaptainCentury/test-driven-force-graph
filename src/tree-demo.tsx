import React, { useState } from "react";
import { Layout, TreeGraph } from "./components/tree-graph";

import styled from "styled-components";

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

const BasicButton = styled.button`
  background: blue;
  border-radius: 3px;
  border: none;
  color: white;
  margin: 2px;
`;

export const LayoutButton = styled(BasicButton)`
  background: red;
`;

export const TreeDemo = () => {
  const [layout, setLayout] = useState<Layout>("radial");
  return (
    <>
      <h1>TreeGraph demo</h1>
      <TreeGraph data={data} layout={layout}>
        <LayoutButton
          onClick={() => {
            setLayout("tree");
          }}
        >
          Tree
        </LayoutButton>
        <LayoutButton
          onClick={() => {
            setLayout("cluster");
          }}
        >
          Cluster
        </LayoutButton>
        <LayoutButton
          onClick={() => {
            setLayout("radial");
          }}
        >
          Radial
        </LayoutButton>
      </TreeGraph>
    </>
  );
};
