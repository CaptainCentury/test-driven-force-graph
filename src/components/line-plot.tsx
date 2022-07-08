import React, { FunctionComponent, useEffect, useRef } from "react";
import d3, { extent, scaleLinear, select } from "d3";

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

  useEffect(() => {
    if (dataTable) {
      var scaleX = scaleLinear()
        .domain(extent(dataTable, (d) => Number(d["x"])))
        .range([0, w]);

      var scaleY1 = scaleLinear()
        .domain(extent(dataTable, (d) => Number(d["y1"])))
        .range([h, 0]);

      var scale2 = scaleLinear()
        .domain(extent(dataTable, (d) => Number(d["y2"])))
        .range([h, 0]);

      select("#line-plot")
        .append("g")
        .attr("id", "ds1")
        .selectAll("circle")
        .data(dataTable)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", "green")
        .attr("cx", (d) => scaleX(Number(d["x"])))
        .attr("cy", (d) => scaleY1(Number(d["y1"])));
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
