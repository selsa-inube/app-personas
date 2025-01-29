import { StoryFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { DateField, DateFieldProps } from "..";
import { parameters, props } from "../props";
import { DateFieldController } from "./DateFieldController";
import { themes } from "@mocks/design/themes";

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
  disabled: false,
  max: "2024-03-14",
  min: "2024-01-01",
  step: "1",
  fullwidth: false,
  required: false,
  readonly: false,
  state: "pending",
  size: "compact",
};

const theme = {
  ...themes["fondecom"],
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
