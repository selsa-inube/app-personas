import { BrowserRouter } from "react-router-dom";
import { Breadcrumbs, BreadcrumbsProps } from "..";
import { props } from "../props";
import { ThemeProvider } from "styled-components";
import { theme } from "@config/theme";
import { StoryFn } from "@storybook/react";

const story = {
  title: "design/navigation/Breadcrumbs",
  components: [Breadcrumbs],
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

export const Default = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;
Default.args = {
  crumbs: [
    {
      path: "/home",
      label: "inicio",
      id: "/home",
      isActive: false,
    },
    {
      path: "/home/users",
      label: "usuarios",
      id: "/home/users",
      isActive: false,
    },
    {
      path: "/home/users/invitation",
      label: "invitación",
      id: "/home/users/invitation",
      isActive: true,
    },
  ],
};

export const ThemedDefault = (args: BreadcrumbsProps) => (
  <ThemeProvider theme={theme}>
    <Breadcrumbs {...args} />
  </ThemeProvider>
);

ThemedDefault.args = {
  ...Default.args,
};

export default story;
