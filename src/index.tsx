import { createRoot } from "react-dom/client";
import { GraphDemo } from "./graph-demo";
import { LinePlotDemo } from "./plot-demo";
import React from "react";
import { ToggleListDemo } from "./toggle-list-demo";
import { BarPlotDemo } from "./bar-plot-demo";
import { DoughnutDemo } from "./doughnut-demo";
import { TreeDemo } from "./tree-demo";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <ToggleListDemo />
    <GraphDemo />
    <LinePlotDemo />
    <BarPlotDemo />
    <DoughnutDemo />
    <TreeDemo />
  </>
);
