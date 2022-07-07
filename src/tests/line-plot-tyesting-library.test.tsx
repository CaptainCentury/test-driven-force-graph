/**
 * @jest-environment jsdom
 */
import React from "react";
import { LinePlot } from "../components/line-plot";
import { render } from "@testing-library/react";

describe("LinePlot", () => {
  it("renders", () => {
    const testId = "plot1";
    const { getByTestId } = render(<LinePlot data-testid={testId} />);
    expect(getByTestId(testId).tagName).toBe("DIV");
  });
});
