import { BrowserRouter } from "react-router-dom";
import { props } from "../props";
import { Breadcrumbs, IBreadcrumbsProps } from "..";
import { ThemeProvider } from "styled-components";
import { theme } from "@config/theme";

const story = {
  title: "design/navigation/Breadcrumbs",
  components: [Breadcrumbs],
  argTypes: props,
  decorators: [
    (Story: React.ElementType) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Desktop = (args: IBreadcrumbsProps) => <Breadcrumbs {...args} />;
Desktop.args = {
  crumbs: [
    {
      path: "/home",
      label: "Inicio",
      id: "/home",
      isActive: false,
    },
    {
      path: "/home/users",
      label: "Usuarios",
      id: "/home/users",
      isActive: false,
    },
    {
      path: "/home/users/invitation",
      label: "Invitación",
      id: "/home/users/invitation",
      isActive: false,
    },
    {
      path: "/home/users/invitation/edition",
      label: "Edición",
      id: "/home/users/invitation/edition",
      isActive: true,
    },
  ],
};

export const ThemedDesktop = (args: IBreadcrumbsProps) => (
  <ThemeProvider theme={theme}>
    <Breadcrumbs {...args} />
  </ThemeProvider>
);

ThemedDesktop.args = {
  ...Desktop.args,
};

export default story;
