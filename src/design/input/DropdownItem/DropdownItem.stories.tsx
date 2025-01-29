import { StoryFn } from "@storybook/react";
import { DropdownItem, DropdownItemProps } from ".";
import { props } from "./props";

import { ThemeProvider } from "styled-components";
import { themes } from "@mocks/design/themes";

const story = {
  title: "design/input/DropdownItem",
  component: [DropdownItem],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<DropdownItemProps> = (args) => (
  <DropdownItem {...args} />
);
Default.args = {
  disabled: false,
  isFocused: false,
  id: "CL002807",
  value: "Crédito libre inversión CL002807",
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<DropdownItemProps> = (args) => (
  <ThemeProvider theme={theme}>
    <DropdownItem {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
