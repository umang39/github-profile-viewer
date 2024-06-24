import React from "react";
import { SocialCard } from "@src/components";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Social Card",
  component: SocialCard,
} as ComponentMeta<typeof SocialCard>;

const data = {
  login: "joe-doe1",
  followers: 5,
  bio: null,
  following: 9,
  avatar_url: "https://xyz.com/1.png",
  blog: "this is a blog",
  html_url: "https://github.com",
  location: "new york",
  name: "joe doe",
  email: "xyz@gmail.com",
};
const Template: ComponentStory<typeof SocialCard> = (args) => (
  <SocialCard {...args} />
);
export const Default = Template.bind({});
Default.args = {
  user: data,
  isFollow: true,
};
