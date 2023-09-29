import { StoryFn } from "@storybook/react";
import { Fieldset, FieldsetProps } from ".";
import { props, parameters } from "./props";
import { fondecom } from "@mocks/design/themes/fondecom";
import { ThemeProvider } from "styled-components";

const story = {
  component: Fieldset,
  title: "design/input/Fieldset",
  tags: ["autodocs"],
  parameters,
  argTypes: {
    ...props,
  },
};

const Template: StoryFn<FieldsetProps> = (args) => <Fieldset {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "User Information",
};

const theme = {
  ...fondecom,
};

export const Themed = (args: FieldsetProps) => (
  <ThemeProvider theme={theme}>
    <Fieldset {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
