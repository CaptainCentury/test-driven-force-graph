import { createRoot } from "react-dom/client";
import { Demo } from "./graph-demo";
import React from "react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Demo />);
