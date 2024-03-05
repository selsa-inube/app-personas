import { fondecom } from "@mocks/design/themes/fondecom";
import { StoryFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { DateField, DateFieldProps } from "..";
import { parameters, props } from "../props";
import { DateFieldController } from "./DateFieldController";

const story = {
  title: "design/input/DateField",
  component: [DateField],
  tags: ["autodocs"],
  parameters,
  argTypes: props,
};

const Default: StoryFn<DateFieldProps> = (args) => (
  <DateFieldController {...args} />
);
Default.args = {
  id: "dateField",
  name: "dateField",
  label: "Date",
  isDisabled: false,
  max: "2024-03-14",
  min: "2024-01-01",
  step: "1",
  isFullWidth: false,
  isRequired: false,
  readOnly: false,
  state: "pending",
  size: "compact",
};

const theme = {
  ...fondecom,
};

const Themed: StoryFn<DateFieldProps> = (args) => (
  <ThemeProvider theme={theme}>
    <DateFieldController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
export { Default, Themed };
