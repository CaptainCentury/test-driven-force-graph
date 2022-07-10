import React, { FunctionComponent, useEffect, useRef } from "react";
import { max, scaleLinear, select } from "d3";

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

  useEffect(() => {
    const n = data.length;
    const maxCount = max(data, (d) => d.count);

    const svg = select("#bar-plot");
    const scaleX = scaleLinear()
      .domain([0, n - 1])
      .range([margin.left, w - margin.right]);
    const scaleY = scaleLinear()
      .domain([0, maxCount])
      .range([h - margin.bottom, margin.top]);

    const cs = svg.selectAll("line").data(data);
    cs.exit().remove();

    cs.enter().append("line").attr("stroke", "red").attr("stroke-width", 20);

    svg.exit().remove();

    svg
      .selectAll("line")
      .data(data)
      .transition()
      .duration(1000)
      .delay((d, i) => 200 * i)
      .attr("x1", (_, i) => scaleX(i + 0.5))
      .attr("x2", (_, i) => scaleX(i + 0.5))
      .transition()
      .duration(1000)
      .delay((d, i) => 200 * i)
      .attr("y1", () => scaleY(0))
      .attr("y2", (d) => scaleY(d.count));
  }, [data]);

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
