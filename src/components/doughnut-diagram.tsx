import React, { FunctionComponent, useEffect, useRef } from "react";
import { arc, pie, PieArcDatum, scaleOrdinal, schemePastel2, select } from "d3";

type VoteData = { name: string; votes: number };

type DoughnutDiagramProps = {
  data: VoteData[];
  children?: string | JSX.Element | JSX.Element[];
};

export const DoughnutDiagram: FunctionComponent<DoughnutDiagramProps> = ({
  data,
  ...props
}) => {
  const svgRef = useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };

  // define display
  const w = 300;
  const h = 300;

  useEffect(() => {
    const doughnut = pie<{ name: string; votes: number }>()
      .value((d) => d.votes)
      .padAngle(0.025)(data);

    const arcMaker = arc<PieArcDatum<VoteData>>()
      .innerRadius(50)
      .outerRadius(150)
      .cornerRadius(10);

    const scale = scaleOrdinal(schemePastel2).domain(
      doughnut.map((d) => d.index.toString())
    );

    const g = select(svgRef.current)
      .append("g")
      .attr(
        "transform",
        `translate(${w / 2 + margin.left}, ${h / 2 + margin.top})`
      );

    g.selectAll("path")
      .data(doughnut)
      .enter()
      .append("path")
      .attr("d", arcMaker)
      .attr("fill", (d) => scale(d.index.toString()))
      .attr("stroke", "grey");

    g.selectAll("text")
      .data(doughnut)
      .enter()
      .append("text")
      .text((d) => d.data.name)
      .attr("x", (d) => arcMaker.innerRadius(85).centroid(d)[0])
      .attr("y", (d) => arcMaker.innerRadius(85).centroid(d)[1])
      .attr("font-family", "sans-serif")
      .attr("font-size", 14)
      .attr("text-anchor", "middle");
  }, [data]);

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
