/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DataButton, Demo } from "../demo";
import React from "react";

describe("Data button", () => {
  it("to render correctly", () => {
    const { getByText } = render(<DataButton>Test</DataButton>);
    expect(getByText("Test")).toMatchSnapshot();
  });
});

describe("Demo component", () => {
  it("renders Abc dataset button", () => {
    const { getByText } = render(<Demo />);
    const element = getByText("ABC");
    expect(element.tagName).toBe("BUTTON");
  });

  it("renders Names dataset button", () => {
    const { getByText } = render(<Demo />);
    const element = getByText(/names/i);
    expect(element.tagName).toBe("BUTTON");
  });

  it("renders correct number of buttons", () => {
    const { getAllByRole } = render(<Demo />);
    const elements = getAllByRole("button");
    expect(elements.length).toBe(2);
  });

  it("renders element Donovan in the graph", () => {
    const { getByText } = render(<Demo />);
    const element = getByText("Donovan");
    expect(element.parentElement.tagName).toBe("g");
  });

  it("switches data when data button is clicked", async () => {
    const user = userEvent.setup();
    const { getByText, queryByText } = render(<Demo />);
    const abcButton = getByText(/abc/i);
    const namesButton = getByText(/names/i);

    await user.click(abcButton);
    expect(queryByText("Donovan")).toBe(null);
    expect(queryByText("C").parentElement.tagName).toBe("g");

    await user.click(namesButton);
    expect(queryByText("C")).toBe(null);
    expect(queryByText("Donovan").parentElement.tagName).toBe("g");
  });

  it("styles ABC dataset button", () => {
    const { getByText } = render(<Demo />);
    const abcButton = getByText(/abc/i);
    expect(abcButton).toHaveStyleRule("background", "green");
    expect(abcButton).toHaveStyleRule("border-radius", "3px");
  });
});
