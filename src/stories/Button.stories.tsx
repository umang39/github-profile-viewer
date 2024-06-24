import React from "react";
import { ButtonComponent } from "@components/index";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "button",
  component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => (
  <ButtonComponent {...args} />
);
export const Dark = Template.bind({});
Dark.args = {
  type: "button",
  value: "button",
  isDisabled: false,
};
export const disabled = Template.bind({});

disabled.args = {
  isDisabled: true,
  value: "button",
  type: "buton" as "button",
};
