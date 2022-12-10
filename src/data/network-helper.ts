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

  const maxOverlap = Math.max(
    ...json["relations"].map((entry: { overlap: number }) => entry["overlap"])
  );

  for (const relation of json["relations"]) {
    const relationObject = relation["object"];
    const relationSubject = relation["subject"];
    const overlap = relation["overlap"];

    edges.push({
      source: nodesMap.get(relationSubject),
      target: nodesMap.get(relationObject),
      weight: Math.log(overlap) / Math.log(maxOverlap),
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
