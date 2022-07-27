import React, { FunctionComponent, useRef, useState } from "react";

type TreeDataNode = {
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
