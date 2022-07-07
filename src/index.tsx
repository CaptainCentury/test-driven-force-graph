import { createRoot } from "react-dom/client";
import { GraphDemo } from "./graph-demo";
import { LinePlotDemo } from "./plot-demo";
import React from "react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <GraphDemo />
    <LinePlotDemo />
  </>
);
