import React, { FunctionComponent, useEffect } from "react";
import { select } from "d3";

type ToggleListProps = {
  items: string[];
};

export const ToggleList: FunctionComponent<ToggleListProps> = ({ items }) => {
  useEffect(() => {
    if (items && items.length > 0) {
      const body = select("#toggle-list");
      body
        .append("ul")
        .selectAll("li")
        .data(items)
        .enter()
        .append("li")
        .text((d) => d);
    }
  }, [items]);
  return <div id="toggle-list" />;
};
