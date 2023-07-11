import { BrowserRouter } from "react-router-dom";
import { NavLink } from ".";
import { MdHouse } from "react-icons/md";

import { fondecom } from "../../../mocks/theme";
import { ThemeProvider } from "styled-components";
import { props } from "./props";

const story = {
  title: "design/navigation/NavLink",
  components: [NavLink],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args) => (
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
  ...fondecom,
};

export const Themed = (args) => (
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
