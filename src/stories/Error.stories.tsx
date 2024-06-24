import React from "react";
import { ErrorComponent } from "@components/index";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Not Found",
  component: ErrorComponent,
} as ComponentMeta<typeof ErrorComponent>;

const Template: ComponentStory<typeof ErrorComponent> = (args) => (
  <ErrorComponent />
);
export const Default = Template.bind({});
