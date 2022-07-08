import React, { FunctionComponent, useEffect, useRef } from "react";
import d3, { extent, line, scaleLinear, select } from "d3";

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

  const colors = ["green", "red"];

  useEffect(() => {
    if (dataTable && dataTable.length > 0) {
      const labels = Object.keys(dataTable[0]);

      var scaleX = scaleLinear()
        .domain(extent(dataTable, (d) => Number(d["x"])))
        .range([0, w]);

      for (let i = 1; i < labels.length; i++) {
        var scaleY = scaleLinear()
          .domain(extent(dataTable, (d) => Number(d[labels[i]])))
          .range([h, 0]);

        select("#line-plot")
          .append("g")
          .attr("id", `line${i}`)
          .selectAll("circle")
          .data(dataTable)
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("fill", colors[i - 1])
          .attr("cx", (d) => scaleX(Number(d[labels[0]])))
          .attr("cy", (d) => scaleY(Number(d[labels[i]])));

        const lineMaker = line()
          .x((d) => scaleX(d[labels[0]]))
          .y((d) => scaleY(d[labels[i]]));

        select(`#line${i}`)
          .append("path")
          .attr("fill", "none")
          .attr("stroke", colors[i - 1])
          .attr("d", lineMaker(dataTable as Iterable<[number, number]>));
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
