import React, { FunctionComponent, useEffect, useRef } from "react";
import {
  axisBottom,
  axisLeft,
  DSVRowArray,
  extent,
  pointer,
  scaleLinear,
  select,
} from "d3";
import { line, curveStep, CurveFactory } from "d3-shape";

type LinePlotProps = {
  dataTable: DSVRowArray<string>;
  curve?: CurveFactory;
  children?: JSX.Element | string;
};

export const LinePlot: FunctionComponent<LinePlotProps> = ({
  dataTable,
  curve = curveStep,
  children,
  ...props
}) => {
  const svgRef = useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };

  // define display
  const w = 300;
  const h = 300;

  const colors = ["green", "red"];

  const coordPixels = (selector, scaleX, scaleY) => {
    const text = select(selector).append("text");
    select(selector)
      .attr("cursor", "crosshair")
      .on("mousemove", function (event) {
        const point = pointer(event);
        text
          .attr("x", 18 + point[0])
          .attr("y", 6 + point[1])
          .text(
            "" +
              scaleX.invert(point[0]).toFixed(2) +
              ", " +
              scaleY.invert(point[1]).toFixed(2)
          );
      })
      .on("mouseenter", function () {
        text.attr("visibility", "visible");
      })
      .on("mouseleave", function () {
        text.attr("visibility", "hidden");
      });
  };

  useEffect(() => {
    if (dataTable && dataTable.length > 0) {
      const labels = Object.keys(dataTable[0]);
      const svg = select("#line-plot");
      const height = Number(svg.attr("height"));

      svg.selectAll("path").remove();

      const makeScale = function (accessor, range) {
        return scaleLinear()
          .domain(extent(dataTable, accessor).map((d) => Number(d)))
          .range(range)
          .nice();
      };

      const scaleX = makeScale(
        (d) => d[labels[0]],
        [margin.left, w + margin.left]
      );

      const drawData = (g, xAccessor, accessor, curve) => {
        g.selectAll("circle")
          .data(dataTable)
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("cx", xAccessor)
          .attr("cy", accessor);

        const lineMaker = line().curve(curve).x(xAccessor).y(accessor);

        g.append("path")
          .attr("fill", "none")
          .attr("d", lineMaker(dataTable as Iterable<[number, number]>));
      };

      for (let i = 1; i < labels.length; i++) {
        const scaleY = makeScale(
          (d) => d[labels[i]],
          [h - margin.bottom, margin.top]
        );

        const g = svg.append("g").attr("id", `line${i}`);
        drawData(
          g,
          (d) => scaleX(d[labels[0]]),
          (d) => scaleY(d[labels[i]]),
          curve
        );

        g.selectAll("circle").attr("fill", colors[i - 1]);
        g.selectAll("path").attr("stroke", colors[i - 1]);
      }

      const scaleYAxis = makeScale(
        (d) => d[labels[1]],
        [h + margin.bottom, margin.bottom]
      );
      const xAxisMaker = axisBottom(scaleX);
      const yAxisMaker = axisLeft(scaleYAxis);

      svg
        .append("g")
        .attr(
          "transform",
          "translate(0, " + (height - margin.bottom).toString() + ")"
        )
        .call(xAxisMaker);
      svg
        .append("g")
        .attr("transform", "translate(" + margin.left + ", 0)")
        .call(yAxisMaker);

      coordPixels(svgRef.current, scaleX, scaleYAxis);
    }
  }, [dataTable, curve]);

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
        LINE PLOT ({dataTable ? dataTable.length : 0} rows) {children}
      </figcaption>
    </figure>
  );
};
