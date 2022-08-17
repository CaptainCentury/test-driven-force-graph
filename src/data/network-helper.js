import yarnballJson from "./network.json";

const networkJsonToNetworkGraph = (json) => {
  console.log(json);
  return { nodes: [], edges: [] };
};

export const yarnball = networkJsonToNetworkGraph(yarnballJson);
