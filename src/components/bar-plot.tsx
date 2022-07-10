import React, { FunctionComponent, useRef } from "react";

type BarPlotProps = {
  data: { label?: string; count: number }[];
  children: JSX.Element | JSX.Element[] | string;
};

export const BarPlot: FunctionComponent<BarPlotProps> = ({
  data,
  children,
  ...props
}) => {
  const svgRef = useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };

  // define display
  var w = 300;
  var h = 300;

  return (
    <figure {...props}>
      <svg
        id="bar-plot"
        ref={svgRef}
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
          overflow: "visible",
        }}
        width={w + margin.left + margin.right}
        height={h + margin.top + margin.bottom}
      />
      <figcaption>
        BAR PLOT ({data ? data.length : 0} counts) {children}
      </figcaption>
    </figure>
  );
};
