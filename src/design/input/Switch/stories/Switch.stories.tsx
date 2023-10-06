import { StoryFn } from "@storybook/react";
import { Switch, SwitchProps } from "..";
import { SwitchController } from "./Switchcontroller";
import { props, parameters } from "../props";

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
  sizeSwitch: "small",
  onChange: () => {},
};

const theme = {
  ...fondecom,
};

export const Themed = (args: SwitchProps) => (
  <ThemeProvider theme={theme}>
    <SwitchController {...args} onSwitchChange={args.onChange} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
