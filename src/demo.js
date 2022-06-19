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
  const [radius, setRadius] = React.useState(10);
  const [data, setData] = React.useState(namesData);
  const [visualizer, setVisualizer] = React.useState(
    ForceGraph.defaultProps.visualizer
  );
  React.useEffect(() => {
    setVisualizer(visualizer.updateRadius(radius));
  }, [radius]);

  return (
    <>
      <ForceGraph
        style={{ color: "blue" }}
        visualizer={visualizer}
        dataset={data}
        labelMode="labels"
      >
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
      <p>
        Node radius:
        <input
          type="number"
          step="1"
          value={radius}
          id="radius"
          min="5"
          onChange={(event) => {
            setRadius(event.target.value);
          }}
        />
      </p>
    </>
  );
};
