import { StoryFn } from "@storybook/react";
import { Switch, SwitchProps } from "..";
import { parameters, props } from "../props";
import { SwitchController } from "./Switchcontroller";

import { fondecom } from "@mocks/design/themes/fondecom";
import { ThemeProvider } from "styled-components";

const story = {
  title: "design/input/Switch",
  component: [Switch],
  parameters,
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<SwitchProps> = (args) => (
  <SwitchController {...args} onSwitchChange={args.onChange} />
);
Default.args = {
  id: "id",
  name: "name",
  value: "switchTest1",
  label: "Switch",
  checked: false,
  size: "small",
};

const theme = {
  ...fondecom,
};

export const Themed: StoryFn<SwitchProps> = (args) => (
  <ThemeProvider theme={theme}>
    <SwitchController {...args} onSwitchChange={args.onChange} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
