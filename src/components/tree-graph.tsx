import React, { FunctionComponent, useRef } from "react";

type TreeGraphProps = {
  children?: string | JSX.Element | JSX.Element[];
};

export const TreeGraph: FunctionComponent<TreeGraphProps> = ({
  children,
  ...props
}) => {
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
      <figcaption>TREE GRAPH () {children}</figcaption>
    </figure>
  );
};
