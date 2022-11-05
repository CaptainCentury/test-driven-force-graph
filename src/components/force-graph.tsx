import React, { FunctionComponent, useEffect, useRef } from "react";
import { forceSimulation } from "d3-force";
import {
  drag,
  forceCenter,
  forceCollide,
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

type GraphNode = {
  x: number;
  y: number;
};

type Edge = {
  name: string;
  source: GraphNode;
  target: GraphNode;
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

var colors = scaleOrdinal(schemeCategory10);

const nodeButton = (selection, radius, labelMode) => {
  selection
    .append("circle")
    .attr("r", radius)
    .style("fill", function (d, i) {
      return colors(i.toString());
    });

  const fontSize = 8;

  if (labelMode === "labels") {
    selection
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("class", "nodelabel")
      .attr("fill", "#fff")
      .attr("stoke", "none")
      .text(function (d) {
        return d.name;
      })
      .style("font-size", function (d) {
        const elementLength = this.getComputedTextLength
          ? (this as SVGTextContentElement).getComputedTextLength()
          : 1;

        return (
          Math.min(2 * radius, ((2 * radius - 1) / elementLength) * fontSize) +
          "px"
        );
      })
      .attr("pointer-events", "none");
  }
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
    // define drag events
    function dragStarted(event, d) {
      if (!event.active) {
        layout.alphaTarget(0.3).restart();
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
        layout.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

    const radius = visualizer.radius;
    var layout = forceSimulation(dataset.nodes)
      .force("charge", forceManyBody().strength(-5))
      .force(
        "link",
        forceLink(dataset.edges)
          .distance(4 * radius)
          .strength(visualizer.linkStrength)
      )
      .force("collide", forceCollide(100).radius(1.5 * radius))
      .force(
        "center",
        forceCenter()
          .x(w / 2)
          .y(h / 2)
      );

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

    var nodes = svg
      .selectAll("g")
      .data(dataset.nodes)
      .enter()
      .append("g")
      .call(nodeButton, radius, labelMode)
      .call(
        drag()
          .on("start", dragStarted)
          .on("drag", dragging)
          .on("end", dragEnded)
      );

    if (labelMode == "tooltip") {
      nodes.append("title").text(function (d: { name: string }) {
        return d.name;
      });
    }

    // simulation tick definition
    layout.on("tick", function () {
      nodes.attr("transform", function (d: GraphNode) {
        return `translate(${d.x}, ${d.y})`;
      });

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
    });
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
