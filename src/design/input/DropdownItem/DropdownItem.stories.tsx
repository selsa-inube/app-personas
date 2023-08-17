import { DropdownItem, DropdownItemProps } from ".";
import { props } from "./props";

import { fondecom } from "@mocks/design/themes/fondecom";
import { ThemeProvider } from "styled-components";

const story = {
  title: "design/input/DropdownItem",
  component: [DropdownItem],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args: DropdownItemProps) => <DropdownItem {...args} />;
Default.args = {
  isDisabled: false,
  isFocused: false,
  id: "CL002807",
  children: "Crédito libre inversión CL002807",
};

const theme = {
  ...fondecom,
};

export const Themed = (args: DropdownItemProps) => (
  <ThemeProvider theme={theme}>
    <DropdownItem {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
