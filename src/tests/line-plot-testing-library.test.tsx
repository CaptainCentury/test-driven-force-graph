/**
 * @jest-environment jsdom
 */
import React from "react";
import { LinePlot } from "../components/line-plot";
import { render } from "@testing-library/react";
import { twoLinesDataPromise } from "../data/two-lines-data";

describe("LinePlot", () => {
  let data = undefined;
  twoLinesDataPromise.then((result) => (data = result));

  it("renders", () => {
    const testId = "plot1";
    const { getByTestId } = render(
      <LinePlot data-testid={testId} dataTable={data} />
    );
    expect(getByTestId(testId).tagName).toBe("FIGURE");
  });
});
