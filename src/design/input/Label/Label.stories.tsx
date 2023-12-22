import { StoryFn } from "@storybook/react";
import { Label, LabelProps } from ".";
import { props } from "./props";

import { fondecom } from "@mocks/design/themes/fondecom";
import { ThemeProvider } from "styled-components";

const story = {
  title: "design/input/Label",
  component: [Label],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<LabelProps> = (args) => <Label {...args} />;
Default.args = {
  size: "large",
  isDisabled: false,
  isFocused: false,
  isInvalid: false,
  children: "Selección de producto",
  htmlFor: "id",
};

const theme = {
  ...fondecom,
};

export const Themed: StoryFn<LabelProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Label {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
