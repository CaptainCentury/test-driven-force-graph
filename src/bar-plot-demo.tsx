import React, { useState } from "react";
import styled from "styled-components";
import { BarPlot } from "./components/bar-plot";

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

const data1 = [{ count: 1 }, { count: 2 }, { count: 0 }];
const data2 = [{ count: 2 }, { count: 1 }, { count: 2 }, { count: 1 }];

export const BarPlotDemo = () => {
  const [data, setData] = useState(data1);
  return (
    <>
      <h1>BarPlot demo</h1>
      <BarPlot data={data}>
        <DataButton onClick={() => setData(data1)}>Data set 1</DataButton>
        <DataButton onClick={() => setData(data2)}>Data set 2</DataButton>
      </BarPlot>
    </>
  );
};
