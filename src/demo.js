import React from "react";
import styled from "styled-components";

import ForceGraph from "./components/force-graph";

const namesData = {
  nodes: [
    { name: "Adam" },
    { name: "Bob" },
    { name: "Carrie" },
    { name: "Donovan" },
    { name: "Edward" },
    { name: "Felicity" },
    { name: "George" },
    { name: "Hannah" },
    { name: "Iris" },
    { name: "Jerry" },
  ],
  edges: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
    { source: 1, target: 5 },
    { source: 2, target: 5 },
    { source: 2, target: 5 },
    { source: 3, target: 4 },
    { source: 5, target: 8 },
    { source: 5, target: 9 },
    { source: 6, target: 7 },
    { source: 7, target: 8 },
    { source: 8, target: 9 },
  ],
};

const AbcData = {
  nodes: [{ name: "A" }, { name: "B" }, { name: "C" }],
  edges: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 1, target: 2 },
  ],
};

const BasicButton = styled.button`
  background: blue;
  border-radius: 3px;
  border: none;
  color: white;
`;

const DataButton = styled(BasicButton)`
  background: green;
`;

export const Demo = () => {
  const [data, setData] = React.useState(namesData);

  return (
    <>
      <ForceGraph style={{ color: "blue" }} dataset={data} labelMode="labels">
        <DataButton
          onClick={() => {
            setData(namesData);
          }}
        >
          Names
        </DataButton>
        <DataButton
          onClick={() => {
            setData(AbcData);
          }}
        >
          ABC
        </DataButton>
      </ForceGraph>
    </>
  );
};
