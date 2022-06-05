import React from "react";
import { forceSimulation } from "d3-force";
import {
  drag,
  forceCenter,
  forceLink,
  forceManyBody,
  scaleOrdinal,
  schemeCategory10,
  select,
} from "d3";

export function ForceGraph({ dataset, children }) {
  const svgRef = React.useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };

  // define display
  var w = 300;
  var h = 300;

  React.useEffect(() => {
    // init simple force layout
    var force = forceSimulation(dataset.nodes)
      .force("charge", forceManyBody())
      .force("link", forceLink(dataset.edges))
      .force(
        "center",
        forceCenter()
          .x(w / 2)
          .y(h / 2)
      );

    // display
    var svgElement = select(svgRef.current);
    svgElement.selectAll("*").remove();
    const svg = svgElement
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    var edges = svg
      .selectAll("line")
      .data(dataset.edges)
      .enter()
      .append("line")
      .style("stroke", "#ccc")
      .style("stroke-width", 1);

    var colors = scaleOrdinal(schemeCategory10);

    var nodes = svg
      .selectAll("circle")
      .data(dataset.nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .style("fill", function (d, i) {
        return colors(i);
      })
      .call(
        drag()
          .on("start", dragStarted)
          .on("drag", dragging)
          .on("end", dragEnded)
      );

    // simple tooltip
    nodes.append("title").text(function (d) {
      return d.name;
    });

    // simulation tick definition
    force.on("tick", function () {
      edges
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });

      nodes
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        });
    });

    // define drag events
    function dragStarted(event, d) {
      if (!event.active) {
        force.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragging(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event, d) {
      if (!event.active) {
        force.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        width={w + margin.left + margin.right}
        height={h + margin.top + margin.bottom}
      />
      <div>{children}</div>
    </>
  );
}
