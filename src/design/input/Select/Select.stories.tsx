import { StoryFn } from "@storybook/react";
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

export const Default: StoryFn<SelectProps> = (args) => <Select {...args} />;
Default.args = {
  isDisabled: false,
  isFullWidth: false,
  isRequired: false,
  size: "wide",
  state: "pending",
  label: "Username",
  placeholder: "Enter your name",
  readOnly: false,
  value: "CL002807",
  options: [
    {
      id: "CL002807",
      value: "Crédito libre inversión CL002807",
    },
    {
      id: "CL002808",
      value: "Crédito libre inversión CL002808",
    },
    {
      isDisabled: true,
      id: "CL002809",
      value: "Crédito libre inversión CL002809",
    },
  ],
};

const theme = {
  ...fondecom,
};

export const Themed: StoryFn<SelectProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Select {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
