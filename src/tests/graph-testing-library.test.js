/**
 * @jest-environment jsdom
 */
import React from "react";

import { ForceGraph } from "../components/force-graph";

import { render, screen } from "@testing-library/react";

describe("ForceGraph in React Testing Library", () => {
  it("renders", () => {
    render(<ForceGraph />);
    const element = screen.getByText(/PLACEHOLDER/i);
    expect(element.tagName).toBe("DIV");
  });
});
