import { BrowserRouter } from "react-router-dom";
import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";
import { FullscreenNav, FullscreenNavProps } from ".";
import { nav } from "@config/nav";
import { props, parameters } from "./props";
import { MdOutlineBadge } from "react-icons/md";
import { StoryFn } from "@storybook/react";

const story = {
  title: "design/navigation/FullscreenNav",
  component: [FullscreenNav],
  tags: ["autodocs"],
  parameters,
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<FullscreenNavProps> = (args) => (
  <BrowserRouter>
    <FullscreenNav {...args} />
  </BrowserRouter>
);

Default.args = {
  logoutPath: "/",
  logoutTitle: "Logout",
  portalId: "portal",
  navigation: nav,
};

export const MultipleSections: StoryFn<FullscreenNavProps> = (args) => (
  <BrowserRouter>
    <FullscreenNav {...args} />
  </BrowserRouter>
);

MultipleSections.args = {
  logoutPath: "/",
  logoutTitle: "Logout",
  portalId: "portal",
  links: [
    {
      label: "Actualizar datos",
      path: "/update-data-assisted",
      icon: <MdOutlineBadge />,
    },
  ],
  navigation: nav,
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<FullscreenNavProps> = (args) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <FullscreenNav {...args} />
    </BrowserRouter>
  </ThemeProvider>
);

Themed.args = { ...MultipleSections.args };

export default story;
