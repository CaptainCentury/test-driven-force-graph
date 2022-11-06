import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  hierarchy,
  HierarchyNode,
  scaleOrdinal,
  schemeReds,
  select,
  treemap,
} from "d3";

type TreeDataNode = {
  size?: number;
  children: TreeDataNode[];
};

type TreeMapProps = {
  data: TreeDataNode;
  children?: string | JSX.Element | JSX.Element[];
};

export const TreeMap: FunctionComponent<TreeMapProps> = ({
  data,
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
    const scale = scaleOrdinal(schemeReds[8]);
    const nodes = hierarchy<TreeDataNode>(data)
      .sum((d) => d.size)
      .sort((a, b) => b.height - a.height || b.value - a.value);

    treemap().size([w, h]).padding(5)(nodes);

    nodes.count();
    setNoLeaves(nodes.value ?? 0);

    nodes.sum(() => 1);
    setNoNodes(nodes.value ?? 0);

    const g = select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll("rect")
      .data(nodes.descendants())
      .enter()
      .append("rect")
      .attr("x", (d: HierarchyNode<TreeDataNode> & { x0: number }) => d.x0)
      .attr(
        "y",
        (d: HierarchyNode<TreeDataNode> & { x0: number; y0: number }) => d.y0
      )
      .attr(
        "width",
        (d: HierarchyNode<TreeDataNode> & { x0: number; x1: number }) =>
          d.x1 - d.x0
      )
      .attr(
        "height",
        (d: HierarchyNode<TreeDataNode> & { y0: number; y1: number }) =>
          d.y1 - d.y0
      )
      .attr("fill", (d: HierarchyNode<TreeDataNode> & { depth: string }) =>
        scale(d.depth)
      )
      .attr("stroke", "red");

    g.selectAll("text")
      .data(nodes.leaves())
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr(
        "x",
        (d: HierarchyNode<TreeDataNode> & { x0: number; x1: number }) =>
          (d.x0 + d.x1) / 2
      )
      .attr(
        "y",
        (d: HierarchyNode<TreeDataNode> & { y0: number; y1: number }) =>
          (d.y0 + d.y1) / 2 + 2
      )
      .text(
        (
          d: HierarchyNode<TreeDataNode> & {
            x0: number;
            y0: number;
            data: { name: string };
          }
        ) => d.data.name
      );
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
        TREE MAP ({noNodes} nodes with {noLeaves} leaves) {children}
      </figcaption>
    </figure>
  );
};
