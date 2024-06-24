import React from "react";
import { EmptySection } from "@src/components";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "EmptyTitle",
  component: EmptySection,
} as ComponentMeta<typeof EmptySection>;

const Template: ComponentStory<typeof EmptySection> = (args) => (
  <EmptySection {...args} />
);
export const Blog = Template.bind({});
Blog.args = {
  title: "blog",
};
export const Bio = Template.bind({});
Bio.args = {
  title: "bio",
};
