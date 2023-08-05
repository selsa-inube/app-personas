import { BrowserRouter } from "react-router-dom";
import { BreadcrumbMenu, IBreadcrumbMenuProps } from "..";
import { props } from "../props";
import { ThemeProvider } from "styled-components";
import { theme } from "@config/theme";

const story = {
  title: "design/navigation/BreadcrumbMenu",
  components: [BreadcrumbMenu],
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

export const Default = (args: IBreadcrumbMenuProps) => (
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

export const Themed = (args: IBreadcrumbMenuProps) => (
  <ThemeProvider theme={theme}>
    <BreadcrumbMenu {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
