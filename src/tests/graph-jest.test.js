import React from "react";
import ForceGraph from "../components/force-graph";

describe("JSX", () => {
  it("calls React.createElement", () => {
    const createElementSpy = jest.spyOn(React, "createElement");
    <h1>Hello, JSX!</h1>;
    expect(createElementSpy).toHaveBeenCalledWith("h1", null, "Hello, JSX!");
  });
});

describe("ForceGraph", () => {
  it("creates ForceGraph component", () => {
    const emptyDataset = { nodes: [], edges: [] };
    const createElementSpy = jest.spyOn(React, "createElement");
    <ForceGraph dataset={emptyDataset}>example</ForceGraph>;
    expect(createElementSpy).toHaveBeenCalledWith(
      ForceGraph,
      { dataset: emptyDataset },
      "example"
    );
  });
});
