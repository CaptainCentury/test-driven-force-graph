import yarnballJson from "./network.json";

const networkJsonToNetworkGraph = (json) => {
  const nodes = new Set<string>();
  const edges = [];
  for (const relation of json["relations"]) {
    const relationObject = relation["object"];
    const relationSubject = relation["subject"];
    nodes.add(relationObject);
    nodes.add(relationSubject);
  }

  const nodesList = Array.from(nodes);
  const nodesMap = new Map(nodesList.map((node, index) => [node, index]));

  for (const relation of json["relations"]) {
    const relationObject = relation["object"];
    const relationSubject = relation["subject"];

    edges.push({
      source: nodesMap.get(relationSubject),
      target: nodesMap.get(relationObject),
    });
  }

  const namedNodes = nodesList.map((name) => {
    return {
      name: name,
    };
  });

  return {
    nodes: namedNodes,
    edges: edges,
  };
};

export const yarnball = networkJsonToNetworkGraph(yarnballJson);
