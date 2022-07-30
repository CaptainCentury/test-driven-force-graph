import React from "react";
import { Histogram } from "./components/histogram";

export const HistogramDemo = () => {
  return (
    <>
      <h1>Histogram demo</h1>
      <Histogram
        data={[1, 1.1, 1.2, 2, 2, 2.1, 2.2, 2.2, 2.3, 2.3, 3, 3, 3, 4, 4, 4, 4]}
      />
    </>
  );
};
