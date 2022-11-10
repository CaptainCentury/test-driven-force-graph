import yarnballJson from "./network.json";

const networkJsonToNetworkGraph = (json) => {
  console.log(json);
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
  console.log(nodesMap);

  for (const relation of json["relations"]) {
    const relationObject = relation["object"];
    const relationSubject = relation["subject"];
    edges.push({
      source: nodesMap[relationSubject],
      target: nodesMap[relationObject],
    });
  }

  const namedNodes = nodesList.map((name) => {
    return {
      name: name,
    };
  });

  console.log(namedNodes);
  console.log(edges);

  return {
    nodes: namedNodes,
    edges: edges,
  };
};

export const yarnball = networkJsonToNetworkGraph(yarnballJson);
