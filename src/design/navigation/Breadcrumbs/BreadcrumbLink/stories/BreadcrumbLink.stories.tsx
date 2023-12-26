import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { BreadcrumbLink, BreadcrumbLinkProps } from "..";
import { BreadcrumbLinkController } from "./BreadcrumbLinkController";

import { ThemeProvider } from "styled-components";

import { theme } from "@config/theme";

import { props } from "../props";

const story = {
  title: "design/navigation/Breadcrumbs/BreadcrumbLink",
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

export const Default: StoryFn<BreadcrumbLinkProps> = (args) => (
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

export const Themed: StoryFn<BreadcrumbLinkProps> = (args) => (
  <ThemeProvider theme={theme}>
    <BreadcrumbLinkController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
