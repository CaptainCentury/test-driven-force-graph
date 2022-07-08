import { createRoot } from "react-dom/client";
import { GraphDemo } from "./graph-demo";
import { LinePlotDemo } from "./plot-demo";
import React from "react";
import { ToggleListDemo } from "./toggle-list-demo";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <ToggleListDemo />
    <GraphDemo />
    <LinePlotDemo />
  </>
);
