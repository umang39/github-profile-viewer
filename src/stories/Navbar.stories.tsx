import React from "react";
import { NavBar } from "@components/index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import store from "@src/store";
import { Provider } from "react-redux";

export default {
  title: "navbar",
  component: NavBar,
} as ComponentMeta<typeof NavBar>;

export const Navbar: ComponentStory<typeof NavBar> = () => (
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  </Provider>
);
