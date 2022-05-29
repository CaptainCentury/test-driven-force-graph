import { ForceGraph} from "./components/force-graph";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<ForceGraph />);
