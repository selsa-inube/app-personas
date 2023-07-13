import { Button } from ".";

import { MdAdd, MdChevronRight } from "react-icons/md";
import { props } from "./props";

import { ThemeProvider } from "styled-components";
import { fondecom } from "../../../mocks/theme";

const story = {
  title: "design/input/Button",
  component: [Button],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args) => <Button {...args} />;
Default.args = {
  children: "Button",
  iconBefore: <MdAdd />,
  iconAfter: <MdChevronRight />,
  appearance: "primary",
  variant: "filled",
  spacing: "wide",
  fullwidth: false,
  disabled: false,
  load: false,
};

const theme = {
  ...fondecom,
};

export const Themed = (args) => (
  <ThemeProvider theme={theme}>
    <Button {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
