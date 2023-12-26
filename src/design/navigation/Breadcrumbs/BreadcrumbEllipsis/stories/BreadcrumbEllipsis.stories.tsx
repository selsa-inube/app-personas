import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@config/theme";
import { BreadcrumbEllipsis, BreadcrumbEllipsisProps } from "../index";
import { props } from "../props";
import { StoryFn } from "@storybook/react";

const story = {
  title: "design/navigation/Breadcrumbs/BreadcrumbEllipsis",
  components: [BreadcrumbEllipsis],
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

export const Default: StoryFn<BreadcrumbEllipsisProps> = (args) => (
  <BreadcrumbEllipsis {...args} />
);
Default.args = {
  routes: [
    {
      label: "Privileges",
      path: "/privileges",
      id: "privileges",
    },
    { label: "Users", path: "/users", id: "users" },
    {
      label: "User edition",
      path: "users/edition",
      id: "usersEdition",
    },
  ],
  size: "large",
  cursorHover: true,
};

export const Themed: StoryFn<BreadcrumbEllipsisProps> = (args) => (
  <ThemeProvider theme={theme}>
    <BreadcrumbEllipsis {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
