import { Button, ButtonProps } from ".";

import { MdAdd, MdChevronRight } from "react-icons/md";
import { props } from "./props";

import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";

const story = {
  title: "design/input/Button",
  component: [Button],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args: ButtonProps) => <Button {...args} />;
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
  ...themes['fondecom'],
};

export const Themed = (args: ButtonProps) => (
  <ThemeProvider theme={theme}>
    <Button {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
