/**
 * @jest-environment jsdom
 */
import React from "react";

import { ForceGraph } from "../components/force-graph";

import { render, screen } from "@testing-library/react";

describe("ForceGraph in React Testing Library", () => {
  it("renders", () => {
    render(
      <div data-testid="element">
        <ForceGraph />
      </div>
    );
    const element = screen.getByTestId("element");
    console.log(element);
    expect(element.tagName).toBe("DIV");
    expect(element.children[0].tagName).toBe("svg");
    expect(element.children[1].tagName).toBe("DIV");
  });

  it("passes children through", () => {
    render(<ForceGraph>CHILDREN</ForceGraph>);
    expect(screen.getByText(/CHILDREN/i).tagName).toBe("DIV");
  });
});
