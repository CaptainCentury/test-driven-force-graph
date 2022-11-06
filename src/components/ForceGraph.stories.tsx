import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ForceGraph, { Visualizer } from "./force-graph";
import namesData from "../data/names";
import abcData from "../data/abc";
import { yarnball } from "../data/network-helper";

export default {
  title: "Example/ForceGraph",
  component: ForceGraph,
  argTypes: {
    labelMode: { control: "select", options: ["labels", "tooltip"] },
  },
} as ComponentMeta<typeof ForceGraph>;

const Template: ComponentStory<typeof ForceGraph> = (args) => (
  <ForceGraph {...args} />
);

export const Abc = Template.bind({});
Abc.args = {
  style: { color: "blue" },
  visualizer: new Visualizer(30, 1),
  dataset: abcData,
  labelMode: "labels",
};

export const Names = Template.bind({});
Names.args = {
  style: { color: "blue" },
  visualizer: new Visualizer(30, 1),
  dataset: namesData,
  labelMode: "labels",
};

export const Yarn = Template.bind({});
Yarn.args = {
  style: { color: "blue" },
  visualizer: new Visualizer(30, 1),
  dataset: yarnball,
  labelMode: "labels",
};
