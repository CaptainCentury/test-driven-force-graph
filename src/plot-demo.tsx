import React, { useState } from "react";
import { LinePlot } from "./components/line-plot";
import { twoLinesDataPromise } from "./data/two-lines-data";

export const LinePlotDemo = () => {
  const [data, setData] = useState(undefined);
  twoLinesDataPromise.then(setData);

  return (
    <>
      <h1>LinePlot example</h1>
      <LinePlot dataTable={data} />
    </>
  );
};
