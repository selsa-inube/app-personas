import { BrowserRouter } from "react-router-dom";
import { BreadcrumbLink, BreadcrumbLinkProps } from "..";
import { BreadcrumbLinkController } from "./BreadcrumbLinkController";
import { StoryFn } from "@storybook/react";

import { ThemeProvider } from "styled-components";

import { theme } from "@config/theme";

import { props } from "../props";

const story = {
  title: "design/navigation/BreadcrumbLink",
  components: [BreadcrumbLink],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default = (args: BreadcrumbLinkProps) => (
  <BreadcrumbLinkController {...args} />
);
Default.args = {
  label: "Privileges",
  path: "/privileges",
  id: "privileges",
  isActive: false,
  typo: "large",
  cursorHover: true,
};

export const Themed = (args: BreadcrumbLinkProps) => (
  <ThemeProvider theme={theme}>
    <BreadcrumbLinkController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
