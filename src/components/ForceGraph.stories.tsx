import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

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

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const abc = Template.bind({});
abc.args = {
  style: { color: "blue" },
  visualizer: new Visualizer(30, 1),
  dataset: abcData,
  labelMode: "labels",
};

export const names = Template.bind({});
names.args = {
  style: { color: "blue" },
  visualizer: new Visualizer(30, 1),
  dataset: namesData,
  labelMode: "labels",
};

export const yarn = Template.bind({});
yarn.args = {
  style: { color: "blue" },
  visualizer: new Visualizer(30, 1),
  dataset: yarnball,
  labelMode: "labels",
};
