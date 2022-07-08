/**
 * @jest-environment jsdom
 */
import React from "react";
import { LinePlot } from "../components/line-plot";
import { render } from "@testing-library/react";
import { twoLinesDataPromise } from "../data/two-lines-data";
import { tsvParse } from "d3";

describe("LinePlot", () => {
  let data = tsvParse("x1\ty1\ty2\n1.0\t0.5\t0.25");

  it("renders", () => {
    const testId = "plot1";
    const { getByTestId } = render(
      <LinePlot data-testid={testId} dataTable={data} />
    );
    expect(getByTestId(testId).tagName).toBe("FIGURE");
  });
});
