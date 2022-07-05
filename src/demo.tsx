import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ForceGraph, { Visualizer } from "./components/force-graph";
import namesData from "./data/names";
import abcData from "./data/abc";

const BasicButton = styled.button`
  background: blue;
  border-radius: 3px;
  border: none;
  color: white;
  margin: 2px;
`;

export const DataButton = styled(BasicButton)`
  background: green;
`;

export const Demo = () => {
  const [radius, setRadius] = useState(10);
  const [linkStrength, setLinkStrength] = useState(0.01);
  const [data, setData] = useState(namesData);
  const [visualizer, setVisualizer] = useState(new Visualizer(20, 1));

  useEffect(() => {
    const update = visualizer.instance();
    update.radius = radius;
    update.linkStrength = linkStrength;
    setVisualizer(update);
  }, [linkStrength, radius]);

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
            setRadius(Number(event.target.value));
          }}
        />
      </p>
      <p>
        Bond strength:
        <input
          type="number"
          step="0.01"
          value={Number(linkStrength)}
          id="link-strength"
          min="0.001"
          onChange={(event) => {
            setLinkStrength(Number(event.target.value));
          }}
        />
      </p>
    </>
  );
};
