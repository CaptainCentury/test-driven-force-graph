import React from "react";
import styled from "styled-components";

import ForceGraph from "./components/force-graph";
import namesData from "./data/names";
import abcData from "./data/abc";

const BasicButton = styled.button`
  background: blue;
  border-radius: 3px;
  border: none;
  color: white;
  margin: 2px;
`;

const DataButton = styled(BasicButton)`
  background: green;
`;

export const Demo = () => {
  const [data, setData] = React.useState(namesData);

  return (
    <>
      <ForceGraph style={{ color: "blue" }} dataset={data} labelMode="labels">
        <div>
          <DataButton
            onClick={() => {
              setData(namesData);
            }}
          >
            Names
          </DataButton>
          <DataButton
            onClick={() => {
              setData(abcData);
            }}
          >
            ABC
          </DataButton>
        </div>
      </ForceGraph>
    </>
  );
};
