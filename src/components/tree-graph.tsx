import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { hierarchy, linkVertical, select, tree } from "d3";

type TreeGraphProps = {
  children?: string | JSX.Element | JSX.Element[];
};

export const TreeGraph: FunctionComponent<TreeGraphProps> = ({
  children,
  ...props
}) => {
  const [noNodes, setNoNodes] = useState(0);
  const svgRef = useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const w = 300;
  const h = 300;

  useEffect(() => {
    const data = { children: [{ children: [] }, { children: [] }] };
    const nodes = hierarchy(data, (d) => d.children);
    tree().size([250, 250])(nodes);

    nodes.count();
    setNoNodes(nodes.value ?? 0);
    const g = select(svgRef.current)
      .append("g")
      .attr("transform", "translate(25, 25)");

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
        TREE GRAPH ({noNodes}) {children}
      </figcaption>
    </figure>
  );
};
