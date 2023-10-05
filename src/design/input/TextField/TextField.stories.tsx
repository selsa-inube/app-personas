import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
} from "react-icons/md";
import { TextField, TextFieldProps } from ".";
import { props, parameters } from "./props";

import { fondecom } from "@mocks/design/themes/fondecom";
import { StoryFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";

const story = {
  title: "design/input/TextField",
  component: [TextField],
  tags: ["autodocs"],
  parameters,
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
  size: "compact",
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

export const Autocomplete: StoryFn<TextFieldProps> = (args) => (
  <TextField {...args} />
);

Autocomplete.args = {
  isDisabled: false,
  isFullWidth: false,
  isRequired: false,
  type: "text",
  size: "compact",
  state: "pending",
  label: "Option",
  placeholder: "Write an option",
  readOnly: false,
  autocomplete: true,
  suggestions: [{id:"Opción-1", value:"Opción-1"}, {id:"Opción-2", value:"Opción-2"}, {id:"Opción-3", value:"Opción-3"}],
  autocompleteChars: 1
};

export default story;
