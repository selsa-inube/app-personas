import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { MdHouse } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { NavLink, NavLinkProps } from ".";
import { props } from "./props";

const story = {
  title: "design/navigation/NavLink",
  components: [NavLink],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<NavLinkProps> = (args) => (
  <BrowserRouter>
    <NavLink {...args} />
  </BrowserRouter>
);

Default.args = {
  icon: <MdHouse />,
  children: "Home",
  selected: false,
  path: "/",
};

const theme = {
  ...themes[enviroment.BUSINESS_UNIT],
};

export const Themed: StoryFn<NavLinkProps> = (args) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <NavLink {...args}>{args.children}</NavLink>
    </BrowserRouter>
  </ThemeProvider>
);

Themed.args = {
  icon: <MdHouse />,
  children: "Home",
  selected: false,
  path: "/",
};

export default story;
