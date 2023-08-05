import { BrowserRouter } from "react-router-dom";
import { BreadcrumbLink, IBreadcrumbLinkProps } from "..";
import { BreadcrumbLinkController } from "./BreadcrumbLinkController";

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
    (Story: React.ElementType) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default = (args: IBreadcrumbLinkProps) => (
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

export const Themed = (args: IBreadcrumbLinkProps) => (
  <ThemeProvider theme={theme}>
    <BreadcrumbLinkController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
