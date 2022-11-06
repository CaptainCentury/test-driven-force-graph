import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  axisLeft,
  bin,
  max,
  min,
  scaleBand,
  scaleLinear,
  select,
  thresholdScott,
} from "d3";

type HistogramProps = {
  data: number[];
  children?: string | JSX.Element | JSX.Element[];
};

export const Histogram: FunctionComponent<HistogramProps> = ({
  data,
  children,
  ...props
}) => {
  const [noBins, setNoBins] = useState(0);
  const svgRef = useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const w = 300;
  const h = 300;

  useEffect(() => {
    const histogram = bin()
      .thresholds(thresholdScott(data, min<number>(data), max<number>(data)))
      .value((d) => d)(data);
    setNoBins(histogram.length);

    const xScale = scaleBand()
      .padding(0.2)
      .round(true)
      .range([0, w])
      .domain(histogram.map((d) => ((d.x0 + d.x1) / 2).toString()));

    const yScale = scaleLinear()
      .range([h, 0])
      .domain([0, max(histogram, (d) => d.length)])
      .nice();

    const g = select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    g.selectAll("rect")
      .data(histogram)
      .enter()
      .append("rect")
      .attr("width", xScale.bandwidth())
      .attr("x", (d) => xScale(((d.x0 + d.x1) / 2).toString()))
      .attr("y", (d) => yScale(d.length))
      .attr("height", (d) => h - yScale(d.length))
      .attr("fill", "red")
      .attr("fill-opacity", 0.2)
      .attr("stroke", "red")
      .attr("stroke-width", 2);

    const fontSize = 14;
    g.selectAll("text")
      .data(histogram)
      .enter()
      .append("text")
      .attr("text_anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", fontSize)
      .attr("x", (d) => xScale(((d.x0 + d.x1) / 2).toString()))
      .attr("y", h + 1.25 * fontSize)
      .text((d) => `[${d.x0}, ${d.x1}]`);

    g.append("g").call(axisLeft(yScale));
  }, [data]);

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
        HISTOGRAM ({data.length} samples in {noBins} bins) {children}
      </figcaption>
    </figure>
  );
};
