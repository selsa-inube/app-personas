import { Select, SelectProps } from ".";
import { props } from "./props";

import { fondecom } from "@mocks/design/themes/fondecom";
import { ThemeProvider } from "styled-components";

const story = {
  title: "design/input/Select",
  component: [Select],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args: SelectProps) => <Select {...args} />;
Default.args = {
  isDisabled: false,
  isFullWidth: false,
  isRequired: false,
  type: "text",
  inputSize: "compact",
  state: "pending",
  label: "Username",
  placeholder: "Enter your name",
  readOnly: false,
  value: "Crédito libre inversión CL002806",
  options: [
    {
      isDisabled: false,
      isFocused: false,
      id: "CL002807",
      children: "Crédito libre inversión CL002807",
    },
    {
      isDisabled: false,
      isFocused: false,
      id: "CL002808",
      children: "Crédito libre inversión CL002808",
    },
    {
      isDisabled: true,
      isFocused: false,
      id: "CL002809",
      children: "Crédito libre inversión CL002809",
    },
  ],
};

const theme = {
  ...fondecom,
};

export const Themed = (args: SelectProps) => (
  <ThemeProvider theme={theme}>
    <Select {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
