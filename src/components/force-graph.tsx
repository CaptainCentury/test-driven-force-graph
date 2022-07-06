import React, { FunctionComponent, useEffect, useRef } from "react";
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

export class Visualizer {
  radius: number;
  linkStrength: number;

  constructor(radius, linkStrength) {
    this.radius = radius;
    this.linkStrength = linkStrength;
  }

  instance() {
    return new Visualizer(this.radius, this.linkStrength);
  }

  toString() {
    return `(r: ${this.radius}, link: ${this.linkStrength})`;
  }
}

type Node = {
  x: number;
  y: number;
};

type Edge = {
  name: string;
  source: Node;
  target: Node;
  x: number;
  y: number;
};

type ForceGraphProps = {
  dataset: any;
  labelMode?: string;
  visualizer?: Visualizer;
  style?: React.CSSProperties;
  children?: JSX.Element | string;
};

const ForceGraph: FunctionComponent<ForceGraphProps> = ({
  dataset,
  labelMode = "labels",
  visualizer = new Visualizer(20, 0.01),
  children,
  ...props
}) => {
  const svgRef = useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };

  // define display
  var w = 300;
  var h = 300;

  useEffect(() => {
    // init simple force layout
    var force = forceSimulation(dataset.nodes)
      .force("charge", forceManyBody())
      .force("link", forceLink(dataset.edges).strength(visualizer.linkStrength))
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
      .attr("r", visualizer.radius)
      .attr("cx", function (d, i) {
        return i * visualizer.radius;
      })
      .style("fill", function (d, i) {
        return colors(i.toString());
      })
      .call(
        drag()
          .on("start", dragStarted)
          .on("drag", dragging)
          .on("end", dragEnded)
      );

    var nodeLabels =
      labelMode == "labels" &&
      svg
        .selectAll(".nodelabel")
        .data<Edge>(dataset.nodes)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return d.y;
        })
        .attr("class", "nodelabel")
        .attr("stroke", "#000")
        .text(function (d) {
          return d.name;
        });

    // simple tooltip

    if (labelMode == "tooltip") {
      nodes.append("title").text(function (d: { name: string }) {
        return d.name;
      });
    }

    // simulation tick definition
    force.on("tick", function () {
      edges
        .attr("x1", function (d: Edge) {
          return d.source.x;
        })
        .attr("y1", function (d: Edge) {
          return d.source.y;
        })
        .attr("x2", function (d: Edge) {
          return d.target.x;
        })
        .attr("y2", function (d: Edge) {
          return d.target.y;
        });

      nodes
        .attr("cx", function (d: Node) {
          return d.x;
        })
        .attr("cy", function (d: Node) {
          return d.y;
        });

      if (nodeLabels) {
        nodeLabels
          .attr("x", function (d) {
            return d.x;
          })
          .attr("y", function (d) {
            return d.y;
          });
      }
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
  }, [dataset, visualizer]);

  return (
    <figure {...props}>
      <svg
        ref={svgRef}
        style={{ borderStyle: "solid", borderWidth: "1px" }}
        width={w + margin.left + margin.right}
        height={h + margin.top + margin.bottom}
      />
      <figcaption>{children}</figcaption>
    </figure>
  );
};

export default ForceGraph;
