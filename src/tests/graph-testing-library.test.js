/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";

import ForceGraph from "../components/force-graph";
import abcData from "../data/abc";

describe("ForceGraph with empty dataset", () => {
  beforeEach(() => {
    const emptyData = { nodes: [], edges: [] };
    render(
      <ForceGraph data-testid="element" dataset={emptyData}>
        CHILDREN
      </ForceGraph>
    );
  });

  it("renders", () => {
    const element = screen.getByTestId("element");
    expect(element.tagName).toBe("FIGURE");
    expect(element.children[0].tagName).toBe("svg");
    expect(element.children[1].tagName).toBe("FIGCAPTION");
  });

  it("passes children through", () => {
    expect(screen.getByText(/CHILDREN/i).tagName).toBe("FIGCAPTION");
  });
});

describe("ForceGraph with simple dataset", () => {
  let rerender;
  beforeEach(() => {
    ({ rerender } = render(
      <ForceGraph dataset={abcData} labelMode="tooltip" />
    ));
  });

  it("renders data", async () => {
    const element = await screen.findByText("A");
    expect(element.parentElement.tagName).toBe("circle");
  });

  it("is translated into shapes of the graph", () => {
    expect(screen.queryByText("A").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("B").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("C").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("D")).toBe(null);
  });

  it("updates graph with new data", () => {
    const updatedData = { ...abcData };
    updatedData.nodes.push({ name: "D" });
    updatedData.edges.concat([
      { source: 0, target: 3 },
      { source: 2, target: 3 },
    ]);

    rerender(<ForceGraph dataset={updatedData} labelMode="tooltip" />);
    expect(screen.queryByText("A").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("B").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("C").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("D").parentElement.tagName).toBe("circle");
  });
});
