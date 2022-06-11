import { createRoot } from "react-dom/client";
import React from "react";

import { Demo } from "./demo";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Demo />);
