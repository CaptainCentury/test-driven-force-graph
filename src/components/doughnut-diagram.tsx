import React, { FunctionComponent, useRef } from "react";

type DoughnutDiagramProps = {
  data: { name: string; votes: number }[];
  children?: string | JSX.Element | JSX.Element[];
};

export const DoughnutDiagram: FunctionComponent<DoughnutDiagramProps> = ({
  data,
  ...props
}) => {
  const svgRef = useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };

  // define display
  var w = 300;
  var h = 300;

  return (
    <figure {...props}>
      <svg
        ref={svgRef}
        style={{ borderStyle: "solid", borderWidth: "1px" }}
        width={w + margin.left + margin.right}
        height={h + margin.top + margin.bottom}
      />
      <figcaption>DONUGHT DIAGRAM ({data.length} candidates)</figcaption>
    </figure>
  );
};
