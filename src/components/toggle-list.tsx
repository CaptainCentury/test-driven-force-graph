import React, { FunctionComponent, useEffect } from "react";
import { select } from "d3";

type ToggleListProps = {
  items: string[];
};

type TogglableHTMLElement = HTMLElement & { toggleState: boolean };

export const ToggleList: FunctionComponent<ToggleListProps> = ({ items }) => {
  useEffect(() => {
    if (items && items.length > 0) {
      const body = select("#toggle-list");
      body
        .append("ul")
        .selectAll("li")
        .data(items)
        .enter()
        .append<TogglableHTMLElement>("li")
        .style("cursor", "pointer")
        .text((d) => d)
        .on("click", function () {
          this.toggleState = !this.toggleState;
          select(this)
            .transition()
            .duration(1000)
            .style("color", this.toggleState ? "red" : "black");
        });
    }
  }, [items]);
  return <div id="toggle-list" />;
};
