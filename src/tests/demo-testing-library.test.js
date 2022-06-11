/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";

import { Demo } from "../demo";

describe("Demo component", () => {
  beforeEach(() => {
    render(<Demo />);
  });

  it("renders Abc dataset button", () => {
    const element = screen.getByText("ABC");
    expect(element.tagName).toBe("BUTTON");
  });

  it("renders Names dataset button", () => {
    const element = screen.getByText("Names");
    expect(element.tagName).toBe("BUTTON");
  });

  it("renders correct number of buttons", () => {
    const elements = screen.getAllByRole("button");
    expect(elements.length).toBe(2);
  });
});
