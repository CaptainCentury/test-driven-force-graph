import React from "react";
import { ForceGraph } from "../components/force-graph";

describe("JSX", () => {
  it("calls React.createElement", () => {
    const createElementSpy = jest.spyOn(React, "createElement");
    <h1>Hello, JSX!</h1>;
    expect(createElementSpy).toHaveBeenCalledWith("h1", null, "Hello, JSX!");
  });
});

describe("ForceGraph", () => {
  it("creates ForceGraph component", () => {
    const createElementSpy = jest.spyOn(React, "createElement");
    <ForceGraph>example</ForceGraph>;
    expect(createElementSpy).toHaveBeenCalledWith(ForceGraph, null, "example");
  });
});
