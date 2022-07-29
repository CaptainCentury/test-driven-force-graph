import React, { FunctionComponent, useEffect, useRef } from "react";

type HistogramProps = {
  data: number[];
  children?: string | JSX.Element | JSX.Element[];
};

export const Histogram: FunctionComponent<HistogramProps> = ({
  data,
  children,
  ...props
}) => {
  const svgRef = useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const w = 300;
  const h = 300;

  useEffect(() => {}, [data]);

  return (
    <figure {...props}>
      <svg
        id="line-plot"
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
        HISTOGRAM ({data.length} samples) {children}
      </figcaption>
    </figure>
  );
};
