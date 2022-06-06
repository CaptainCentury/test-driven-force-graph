/**
 * @jest-environment jsdom
 */
import React from "react";

import { ForceGraph } from "../components/force-graph";

import { render, screen } from "@testing-library/react";

describe("ForceGraph in React Testing Library", () => {
  it("renders", () => {
    const emptyData = { nodes: [], edges: [] };
    render(
      <div data-testid="element">
        <ForceGraph dataset={emptyData} />
      </div>
    );
    const element = screen.getByTestId("element");
    console.log(element);
    expect(element.tagName).toBe("DIV");
    expect(element.children[0].tagName).toBe("svg");
    expect(element.children[1].tagName).toBe("DIV");
  });

  it("passes children through", () => {
    const emptyData = { nodes: [], edges: [] };
    render(<ForceGraph dataset={emptyData}>CHILDREN</ForceGraph>);
    expect(screen.getByText(/CHILDREN/i).tagName).toBe("DIV");
  });

  it("renders data", async () => {
    const data = {
      nodes: [{ name: "A" }, { name: "B" }, { name: "C" }],
      edges: [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 1, target: 2 },
      ],
    };
    render(<ForceGraph dataset={data} />);
    const element = await screen.findByText("A");
    expect(element.parentElement.tagName).toBe("circle");
  });

  it("updates graph with new data", () => {
    const data = {
      nodes: [{ name: "A" }, { name: "B" }, { name: "C" }],
      edges: [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 1, target: 2 },
      ],
    };
    const { rerender } = render(<ForceGraph dataset={data} />);
    const updatedData = {
      nodes: [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }],
      edges: [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 1, target: 2 },
        { source: 0, target: 3 },
        { source: 2, target: 3 },
      ],
    };
    expect(screen.queryByText("A").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("B").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("C").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("D")).toBe(null);

    rerender(<ForceGraph dataset={updatedData} />);
    expect(screen.queryByText("A").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("B").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("C").parentElement.tagName).toBe("circle");
    expect(screen.queryByText("D").parentElement.tagName).toBe("circle");
  });
});
