import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAttachMoney,
} from "react-icons/md";
import { TextField, TextFieldProps } from "..";
import { parameters, props } from "../props";

import { fondecom } from "@mocks/design/themes/fondecom";
import { StoryFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { AutocompleteController } from "./AutocompleteController";

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
  disabled: false,
  fullwidth: false,
  required: false,
  type: "text",
  size: "compact",
  state: "pending",
  label: "Username",
  placeholder: "Write your full name",
  readonly: false,
  iconBefore: <MdOutlineAccountBalanceWallet />,
  iconAfter: <MdOutlineAttachMoney />,
};

const theme = {
  ...fondecom,
};

export const Themed: StoryFn<TextFieldProps> = (args) => (
  <ThemeProvider theme={theme}>
    <TextField {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export const Autocomplete: StoryFn<TextFieldProps> = (args) => (
  <AutocompleteController {...args} />
);

Autocomplete.args = {
  disabled: false,
  fullwidth: false,
  required: false,
  type: "text",
  size: "compact",
  state: "pending",
  label: "Option",
  placeholder: "Write an option",
  readonly: false,
  autocomplete: true,
  suggestions: [
    { id: "Opción-A", value: "Opción-A" },
    { id: "Opción-B", value: "Opción-B" },
    { id: "Opción-C", value: "Opción-C" },
    { id: "Opción-D", value: "Opción-D" },
    { id: "Opción-E", value: "Opción-E" },
    { id: "Opción-F", value: "Opción-F" },
    { id: "Opción-G", value: "Opción-G" },
    { id: "Opción-H", value: "Opción-H" },
    { id: "Opción-I", value: "Opción-I" },
  ],
  autocompleteChars: 2,
};

export default story;
