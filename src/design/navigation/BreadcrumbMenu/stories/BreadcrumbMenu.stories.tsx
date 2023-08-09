import { BrowserRouter } from "react-router-dom";
import { BreadcrumbMenu, BreadcrumbMenuProps } from "..";
import { props } from "../props";
import { ThemeProvider } from "styled-components";
import { theme } from "@config/theme";
import { StoryFn } from "@storybook/react";

const story = {
  title: "design/navigation/BreadcrumbMenu",
  components: [BreadcrumbMenu],
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

export const Default = (args: BreadcrumbMenuProps) => (
  <div style={{ height: "100px", transform: "translateZ(0)" }}>
    <BreadcrumbMenu {...args} />
  </div>
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
};

export const Themed = (args: BreadcrumbMenuProps) => (
  <ThemeProvider theme={theme}>
    <BreadcrumbMenu {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
