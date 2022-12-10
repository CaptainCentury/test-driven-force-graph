import yarnballJson from "./network.json";

const networkJsonToNetworkGraph = (json, labelReplacements) => {
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
      name: labelReplacements[name] || name,
    };
  });

  return {
    nodes: namedNodes,
    edges: edges,
  };
};

const uniProtLookup = {
  "HGNC:11765": "P01135",
  "HGNC:11892": "P01375",
  "HGNC:6018": "P05231",
  "HGNC:6025": "P10145",
  "HGNC:6596": "P15018",
};
export const yarnball = networkJsonToNetworkGraph(yarnballJson, uniProtLookup);
