import React, { FunctionComponent, useEffect, useRef } from "react";
import d3 from "d3";

type LinePlotProps = {
  dataTable: d3.DSVRowArray<string>;
};

export const LinePlot: FunctionComponent<LinePlotProps> = ({
  dataTable,
  ...props
}) => {
  const svgRef = useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };

  // define display
  var w = 300;
  var h = 300;

  useEffect(() => {}, []);

  return (
    <figure {...props}>
      <svg
        ref={svgRef}
        style={{ borderStyle: "solid", borderWidth: "1px" }}
        width={w + margin.left + margin.right}
        height={h + margin.top + margin.bottom}
      />
      <figcaption>
        LINE PLOT ({dataTable ? dataTable.length : 0} rows)
      </figcaption>
    </figure>
  );
};
