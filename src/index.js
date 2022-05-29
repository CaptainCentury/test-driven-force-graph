import { ForceGraph} from "./components/force-graph";
import { createRoot } from "react-dom/client";
import React from "react";

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<ForceGraph />);
