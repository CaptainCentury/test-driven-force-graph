/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";

import ForceGraph, { Visualizer } from "../components/force-graph";
import abcData from "../data/abc";

const detectCircleSibling = (element: HTMLElement) => {
  return Array.from(element?.parentElement.children ?? []).some(
    (sibling) => sibling.tagName === "circle"
  );
};

const getCircleSiblings = (element: HTMLElement) => {
  return Array.from(element?.parentElement.children ?? []).filter(
    (sibling) => sibling.tagName === "circle"
  );
};

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
      <ForceGraph dataset={abcData} labelMode="labels" />
    ));
  });

  it("renders data", async () => {
    const element = await screen.findByText("A");
    expect(detectCircleSibling(element)).toBeTruthy();
  });

  it("is translated into shapes of the graph", () => {
    expect(detectCircleSibling(screen.queryByText("A"))).toBeTruthy();
    expect(detectCircleSibling(screen.queryByText("B"))).toBeTruthy();
    expect(detectCircleSibling(screen.queryByText("C"))).toBeTruthy();
    expect(detectCircleSibling(screen.queryByText("D"))).toBeFalsy();
  });

  it("updates graph with new data", () => {
    const updatedData = { ...abcData };
    updatedData.nodes.push({ name: "D" });
    updatedData.edges.concat([
      { source: 0, target: 3 },
      { source: 2, target: 3 },
    ]);

    rerender(<ForceGraph dataset={updatedData} labelMode="labels" />);
    expect(detectCircleSibling(screen.queryByText("A"))).toBeTruthy();
    expect(detectCircleSibling(screen.queryByText("B"))).toBeTruthy();
    expect(detectCircleSibling(screen.queryByText("C"))).toBeTruthy();
    expect(detectCircleSibling(screen.queryByText("D"))).toBeTruthy();
  });
});

describe("Visualizer", () => {
  it("has default settings", () => {
    const { getByText } = render(
      <ForceGraph dataset={abcData} labelMode="labels" />
    );
    expect(getCircleSiblings(getByText("A"))[0]).toHaveAttribute("r", "20");
  });

  it("sets radius of node element visualization", () => {
    const visualizer = new Visualizer(20, 1);
    visualizer.radius = 30;
    const result = render(
      <ForceGraph
        dataset={abcData}
        visualizer={visualizer}
        labelMode="labels"
      />
    );
    expect(getCircleSiblings(result.getByText("A"))[0]).toHaveAttribute(
      "r",
      "30"
    );
  });
});
