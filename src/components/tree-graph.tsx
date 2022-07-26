import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { cluster, hierarchy, linkVertical, select, tree } from "d3";

type TreeDataNode = {
  children: TreeDataNode[];
};

type Layout = "tree" | "cluster";

type TreeGraphProps = {
  data: TreeDataNode;
  layout?: Layout;
  children?: string | JSX.Element | JSX.Element[];
};

export const TreeGraph: FunctionComponent<TreeGraphProps> = ({
  data,
  layout = "cluster",
  children,
  ...props
}) => {
  const [noLeaves, setNoLeaves] = useState(0);
  const [noNodes, setNoNodes] = useState(0);
  const svgRef = useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const w = 300;
  const h = 300;

  useEffect(() => {
    const nodes = hierarchy(data, (d) => d.children);
    if (layout === "tree") {
      tree().size([w, h])(nodes);
    } else if (layout === "cluster") {
      nodes.sort((a, b) => b.height - a.height);
      cluster().size([w, h])(nodes);
    } else {
      throw new Error("Unimplemented layout option");
    }
    nodes.count();
    setNoLeaves(nodes.value ?? 0);

    nodes.sum((d) => 1);
    setNoNodes(nodes.value ?? 0);

    const g = select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const lineMaker = linkVertical<any, { x: number; y: number }>()
      .x((d) => d.x)
      .y((d) => d.y);

    g.selectAll("path")
      .data(nodes.links())
      .enter()
      .append("path")
      .attr("d", (d) => lineMaker(d))
      .attr("stroke", "red")
      .attr("fill", "none");

    g.selectAll("circle")
      .data<any>(nodes.descendants())
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
  }, []);

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
        TREE GRAPH ({noNodes} nodes with {noLeaves} leaves) {children}
      </figcaption>
    </figure>
  );
};
