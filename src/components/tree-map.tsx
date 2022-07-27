import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { hierarchy, scaleOrdinal, schemeReds, select, treemap } from "d3";

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
    const nodes = hierarchy(data)
      .sum((d) => d.size)
      .sort((a, b) => b.height - a.height || b.value - a.value);

    treemap().size([w, h]).padding(5)(nodes);

    nodes.count();
    setNoLeaves(nodes.value ?? 0);

    nodes.sum((d) => 1);
    setNoNodes(nodes.value ?? 0);

    const g = select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll("rect")
      .data(nodes.descendants())
      .enter()
      .append("rect")
      .attr("x", (d: any) => d.x0)
      .attr("y", (d: any) => d.y0)
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("fill", (d: any) => scale(d.depth))
      .attr("stroke", "red");

    g.selectAll("text")
      .data(nodes.leaves())
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("x", (d: any) => (d.x0 + d.x1) / 2)
      .attr("y", (d: any) => (d.y0 + d.y1) / 2 + 2)
      .text((d: any) => d.data.name);
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
