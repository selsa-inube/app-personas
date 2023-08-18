import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
} from "react-icons/md";
import { TextField, TextFieldProps } from ".";
import { props } from "./props";

import { fondecom } from "@mocks/design/themes/fondecom";
import { StoryFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";

const story = {
  title: "design/input/TextField",
  component: [TextField],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<TextFieldProps> = (args) => (
  <TextField {...args} />
);

Default.args = {
  isDisabled: false,
  isFullWidth: false,
  isRequired: false,
  type: "text",
  inputSize: "compact",
  state: "pending",
  label: "Username",
  placeholder: "Write your full name",
  readOnly: false,
  iconBefore: <MdOutlineAccountBalanceWallet />,
  iconAfter: <MdOutlineAttachMoney />,
};

const theme = {
  ...fondecom,
};

export const Themed = (args: TextFieldProps) => (
  <ThemeProvider theme={theme}>
    <TextField {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
