import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  cluster,
  hierarchy,
  linkHorizontal,
  linkVertical,
  select,
  tree,
} from "d3";

type TreeDataNode = {
  children: TreeDataNode[];
};

export type Layout = "tree" | "cluster" | "radial";
export type Orientation = "vertical" | "horizontal";

type TreeGraphProps = {
  data: TreeDataNode;
  layout?: Layout;
  orientation?: Orientation;
  children?: string | JSX.Element | JSX.Element[];
};

const hTransformation = (r: number, phi: number) => {
  return r * Math.sin(phi);
};

const vTransformation = (r: number, phi: number) => {
  return -r * Math.cos(phi);
};

export const TreeGraph: FunctionComponent<TreeGraphProps> = ({
  data,
  layout = "tree",
  orientation = "vertical",
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
    select(svgRef.current).selectAll("g").remove();
    if (layout === "tree") {
      tree().size([w, h])(nodes);
    } else if (layout === "cluster") {
      nodes.sort((a, b) => b.height - a.height);
      cluster().size([w, h])(nodes);
    } else if (layout === "radial") {
      nodes.sort((a, b) => b.height - a.height);
      cluster().size([2 * Math.PI, w / 2])(nodes);
    } else {
      throw new Error("Unimplemented layout option");
    }
    nodes.count();
    setNoLeaves(nodes.value ?? 0);

    nodes.sum((d) => 1);
    setNoNodes(nodes.value ?? 0);

    const shift = [
      (layout === "radial" ? w / 2 : 0) + margin.left,
      (layout === "radial" ? w / 2 : 0) + margin.top,
    ];

    const g = select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${shift[0]}, ${shift[1]})`);

    const xAccessor = (d) =>
      layout === "radial"
        ? hTransformation(d.y, d.x)
        : orientation === "vertical"
        ? d.x
        : d.y;
    const yAccessor = (d) =>
      layout === "radial"
        ? vTransformation(d.y, d.x)
        : orientation === "vertical"
        ? d.y
        : d.x;

    if (layout === "radial") {
      g.selectAll("line")
        .data(nodes.links())
        .enter()
        .append("line")
        .attr("stroke", "red")
        .attr("x1", (d) =>
          hTransformation((d.source as any).y, (d.source as any).x)
        )
        .attr("y1", (d) =>
          vTransformation((d.source as any).y, (d.source as any).x)
        )
        .attr("x2", (d) =>
          hTransformation((d.target as any).y, (d.target as any).x)
        )
        .attr("y2", (d) =>
          vTransformation((d.target as any).y, (d.target as any).x)
        );
    } else {
      const lineMaker = (
        orientation === "vertical"
          ? linkVertical<any, { x: number; y: number }>()
          : linkHorizontal<any, { x: number; y: number }>()
      )
        .x(xAccessor)
        .y(yAccessor);

      g.selectAll("path")
        .data(nodes.links())
        .enter()
        .append("path")
        .attr("d", (d) => lineMaker(d))
        .attr("stroke", "red")
        .attr("fill", "none");
    }

    g.selectAll("circle")
      .data<any>(nodes.descendants())
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", xAccessor)
      .attr("cy", yAccessor);
  }, [layout]);

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
