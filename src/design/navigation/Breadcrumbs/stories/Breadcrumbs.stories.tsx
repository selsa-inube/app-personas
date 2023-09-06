import { theme } from "@config/theme";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Breadcrumbs, BreadcrumbsProps } from "..";
import { props } from "../props";

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
    },
    {
      path: "/home/users",
      label: "usuarios",
      id: "/home/users",
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
