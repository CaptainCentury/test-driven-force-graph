import React, { useEffect, useState } from "react";
import { LinePlot } from "./components/line-plot";
import { twoLinesDataPromise } from "./data/two-lines-data";

import styled from "styled-components";
import type { CurveFactory } from "d3-shape";
import { curveLinear, curveNatural, curveStep } from "d3-shape";

const BasicButton = styled.button`
  background: blue;
  border-radius: 3px;
  border: none;
  color: white;
  margin: 2px;
`;

export const CurveButton = styled(BasicButton)`
  background: red;
`;

export const LinePlotDemo = () => {
  const [data, setData] = useState(undefined);
  const [curve, setCurve] = useState<CurveFactory>(() => curveStep);
  useEffect(() => {
    twoLinesDataPromise.then(setData);
  }, []);

  return (
    <>
      <h1>LinePlot example</h1>
      <LinePlot dataTable={data} curve={curve}>
        <>
          <CurveButton
            onClick={() => {
              setCurve(() => curveStep);
            }}
          >
            Step
          </CurveButton>
          <CurveButton
            onClick={() => {
              setCurve(() => curveLinear);
            }}
          >
            Linear
          </CurveButton>
          <CurveButton
            onClick={() => {
              setCurve(() => curveNatural);
            }}
          >
            Natural
          </CurveButton>
        </>
      </LinePlot>
    </>
  );
};
