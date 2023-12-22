import { theme } from "@config/theme";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Breadcrumbs, BreadcrumbsProps } from "..";
import { props } from "../props";

const story = {
  title: "design/navigation/Breadcrumbs",
  components: [Breadcrumbs],
  argTypes: props,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Desktop: StoryFn<BreadcrumbsProps> = (args) => (
  <Breadcrumbs {...args} />
);
Desktop.args = {
  crumbs: [
    {
      path: "/home",
      label: "Inicio",
      id: "/home",
    },
    {
      path: "/home/users",
      label: "Usuarios",
      id: "/home/users",
    },
    {
      path: "/home/users/invitation",
      label: "Invitación",
      id: "/home/users/invitation",
    },
    {
      path: "/home/users/invitation/edition",
      label: "Edición",
      id: "/home/users/invitation/edition",
      isActive: true,
    },
  ],
};

export const ThemedDesktop: StoryFn<BreadcrumbsProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Breadcrumbs {...args} />
  </ThemeProvider>
);

ThemedDesktop.args = {
  ...Desktop.args,
};

export default story;
