import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { MdOutlineBadge } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { FullscreenNav, FullscreenNavProps } from ".";
import { parameters, props } from "./props";

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
  logoutTitle: "Logout",
  portalId: "portal",
};

export const MultipleSections: StoryFn<FullscreenNavProps> = (args) => (
  <BrowserRouter>
    <FullscreenNav {...args} />
  </BrowserRouter>
);

MultipleSections.args = {
  logoutTitle: "Logout",
  portalId: "portal",
  links: [
    {
      label: "Actualizar datos",
      path: "/update-data-assisted",
      icon: <MdOutlineBadge />,
    },
  ],
};

const theme = {
  ...themes[enviroment.BUSINESS_UNIT],
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
