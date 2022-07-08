import React, { FunctionComponent, useEffect, useRef } from "react";
import { DSVRowArray, extent, scaleLinear, select } from "d3";
import { line, curveStep } from "d3-shape";

type LinePlotProps = {
  dataTable: DSVRowArray<string>;
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

  const colors = ["green", "red"];

  useEffect(() => {
    if (dataTable && dataTable.length > 0) {
      const labels = Object.keys(dataTable[0]);
      const svg = select("#line-plot");
      const width = Number(svg.attr("width"));
      const height = Number(svg.attr("height"));

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

      const drawData = (g, xAccessor, accessor, color, curve) => {
        g.selectAll("circle")
          .data(dataTable)
          .enter()
          .append("circle")
          .attr("fill", color)
          .attr("r", 5)
          .attr("cx", xAccessor)
          .attr("cy", accessor);

        const lineMaker = line().curve(curve).x(xAccessor).y(accessor);

        g.append("path")
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("d", lineMaker(dataTable as Iterable<[number, number]>));
      };

      for (let i = 1; i < labels.length; i++) {
        var scaleY = makeScale(
          (d) => d[labels[i]],
          [h + margin.bottom, margin.bottom]
        );

        const g = svg.append("g").attr("id", `line${i}`);
        drawData(
          g,
          (d) => scaleX(d[labels[0]]),
          (d) => scaleY(d[labels[i]]),
          colors[i - 1],
          curveStep
        );
      }
    }
  }, [dataTable]);

  return (
    <figure {...props}>
      <svg
        id="line-plot"
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
