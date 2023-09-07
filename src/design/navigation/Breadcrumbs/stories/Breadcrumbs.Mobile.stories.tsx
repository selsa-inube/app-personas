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

export const Mobile = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;
Mobile.args = {
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
    },
    {
      path: "/home/users/invitation/branches",
      label: "Ramas",
      id: "/home/users/invitation/branches",
    },
    {
      path: "/home/users/invitation/Branches/city",
      label: "Ciudad",
      id: "/home/users/invitation/Branches/city",
      isActive: true,
    },
  ],
};

export const ThemedMobile = (args: BreadcrumbsProps) => (
  <ThemeProvider theme={theme}>
    <Breadcrumbs {...args} />
  </ThemeProvider>
);

ThemedMobile.args = {
  ...Mobile.args,
};

export default story;
