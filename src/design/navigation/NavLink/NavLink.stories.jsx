import { BrowserRouter } from "react-router-dom";
import { NavLink } from ".";
import { MdHouse } from "react-icons/md";

import { fondecom } from "../../../mocks/theme";
import { ThemeProvider } from "styled-components";

const story = {
  title: "design/navigation/NavLink",
  components: [NavLink],
};

export const Default = (args) => (
  <BrowserRouter>
    <NavLink {...args}>Home</NavLink>
  </BrowserRouter>
);

Default.args = {
  icon: <MdHouse />,
  isSelected: false,
  to: "/",
};

const theme = {
  ...fondecom,
};

export const Themed = (args) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <NavLink {...args}>Home</NavLink>
    </BrowserRouter>
  </ThemeProvider>
);

Themed.args = {
  icon: <MdHouse />,
  isSelected: false,
  to: "/",
};

export default story;
