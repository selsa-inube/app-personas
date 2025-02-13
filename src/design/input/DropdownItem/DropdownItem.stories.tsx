import { StoryFn } from "@storybook/react";
import { DropdownItem, DropdownItemProps } from ".";
import { props } from "./props";

import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";

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
  ...themes[enviroment.BUSINESS_UNIT],
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
