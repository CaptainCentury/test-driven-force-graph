/**
 * @jest-environment jsdom
 */
import React from "react";

import ForceGraph from "../components/force-graph";

import { render, screen } from "@testing-library/react";

describe("ForceGraph with empty dataset", () => {
  beforeEach(() => {
    const emptyData = { nodes: [], edges: [] };
    render(
      <div data-testid="element">
        <ForceGraph data-testid="element" dataset={emptyData}>
          CHILDREN
        </ForceGraph>
      </div>
    );
  });

  it("renders", () => {
    const element = screen.getByTestId("element");
    expect(element.tagName).toBe("DIV");
    expect(element.children[0].tagName).toBe("svg");
    expect(element.children[1].tagName).toBe("DIV");
  });

  it("passes children through", () => {
    expect(screen.getByText(/CHILDREN/i).tagName).toBe("DIV");
  });
});

describe("ForceGraph with simple dataset", () => {
  let rerender;
  const data = {
    nodes: [{ name: "A" }, { name: "B" }, { name: "C" }],
    edges: [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 1, target: 2 },
    ],
  };
  beforeEach(() => {
    ({ rerender } = render(<ForceGraph dataset={data} />));
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
    const updatedData = { ...data };
    updatedData.nodes.push({ name: "D" });
    updatedData.edges.concat([
      { source: 0, target: 3 },
      { source: 2, target: 3 },
    ]);

    rerender(<ForceGraph dataset={updatedData} />);
    expect(screen.queryByText("A").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("B").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("C").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("D").parentElement.tagName).toBe("circle");
  });
});
