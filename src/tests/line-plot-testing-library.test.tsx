/**
 * @jest-environment jsdom
 */
import React from "react";
import { LinePlot } from "../components/line-plot";
import { render } from "@testing-library/react";
import { tsvParse } from "d3";

describe("LinePlot", () => {
  const empty = tsvParse("");
  const data = tsvParse("x1\ty1\ty2\n1.0\t0.5\t0.25\n2.0\t0.5\t0.5");

  it("renders", () => {
    const testId = "plot1";
    const { getByTestId } = render(
      <LinePlot data-testid={testId} dataTable={data} />
    );
    expect(getByTestId(testId)).toMatchSnapshot();
  });

  it("renders for empty data", () => {
    const testId = "plot1";
    const { getByTestId } = render(
      <LinePlot data-testid={testId} dataTable={empty} />
    );
    expect(getByTestId(testId)).toMatchSnapshot();
  });

  it("renders for undefined data", () => {
    const testId = "plot1";
    const { getByTestId } = render(
      <LinePlot data-testid={testId} dataTable={undefined} />
    );
    expect(getByTestId(testId)).toMatchSnapshot();
  });
});
