import { BrowserRouter } from "react-router-dom";
import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";
import { FullscreenNav, FullscreenNavProps } from ".";
import { nav } from "@config/nav";
import { props, parameters } from "./props";
import { MdOutlineBadge } from "react-icons/md";

const story = {
  title: "design/navigation/FullscreenNav",
  component: [FullscreenNav],
  tags: ["autodocs"],
  parameters,
  argTypes: {
    ...props,
  },
};

export const Default = (args: FullscreenNavProps) => (
  <BrowserRouter>
    <FullscreenNav {...args} />
  </BrowserRouter>
);

Default.args = {
  logoutPath: "/",
  logoutTitle: "Logout",
  portalId: "portal",
  navigation: nav,
};

export const MultipleSections = (args: FullscreenNavProps) => (
  <BrowserRouter>
    <FullscreenNav {...args} />
  </BrowserRouter>
);

MultipleSections.args = {
  logoutPath: "/",
  logoutTitle: "Logout",
  portalId: "portal",
  links: [
    {
      label: "Actualizar datos",
      path: "/update-data",
      icon: <MdOutlineBadge />,
    },
  ],
  navigation: nav,
};

const theme = {
  ...themes["fondecom"],
};

export const Themed = (args: FullscreenNavProps) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <FullscreenNav {...args} />
    </BrowserRouter>
  </ThemeProvider>
);

Themed.args = { ...MultipleSections.args };

export default story;
