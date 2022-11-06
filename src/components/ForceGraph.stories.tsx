import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import styled from "styled-components";

import ForceGraph, { Visualizer } from "./force-graph";
import namesData from "../data/names";
import abcData from "../data/abc";
import { yarnball } from "../data/network-helper";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/ForceGraph",
  component: ForceGraph,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ForceGraph>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ForceGraph> = (args) => (
  <ForceGraph {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  style: { color: "blue" },
  visualizer: new Visualizer(30, 1),
  dataset: abcData,
  labelMode: "labels",
};
