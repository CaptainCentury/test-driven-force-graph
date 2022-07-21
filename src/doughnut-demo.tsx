import React from "react";
import { DoughnutDiagram } from "./components/doughnut-diagram";

import { votesData } from "./data/votes";

export const DoughnutDemo = () => {
  return (
    <>
      <h1>DoughnutDiagram demo</h1>
      <DoughnutDiagram data={votesData}></DoughnutDiagram>
    </>
  );
};
