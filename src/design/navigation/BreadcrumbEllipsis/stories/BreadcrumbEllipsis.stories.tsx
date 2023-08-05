import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@config/theme";
import { BreadcrumbEllipsis, IBreadcrumbEllipsisProps } from "../index";
import { props } from "../props";

const story = {
  title: "design/navigation/BreadcrumbEllipsis",
  components: [BreadcrumbEllipsis],
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

export const Default = (args: IBreadcrumbEllipsisProps) => (
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

export const Themed = (args: IBreadcrumbEllipsisProps) => (
  <ThemeProvider theme={theme}>
    <BreadcrumbEllipsis {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
