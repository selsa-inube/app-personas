import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@config/theme";
import { BreadcrumbMenuLink, BreadcrumbMenuLinkProps } from "..";
import { props } from "../props";
import { StoryFn } from "@storybook/react";

const story = {
  title: "design/navigation/Breadcrumbs/BreadcrumbMenuLink",
  components: [BreadcrumbMenuLink],
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

export const Default = (args: BreadcrumbMenuLinkProps) => (
  <BreadcrumbMenuLink {...args} />
);
Default.args = {
  label: "Privileges",
  path: "/privileges",
  id: "privileges",
  typo: "large",
};

export const Themed = (args: BreadcrumbMenuLinkProps) => (
  <ThemeProvider theme={theme}>
    <BreadcrumbMenuLink {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
