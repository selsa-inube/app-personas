import { ThemeProvider } from "styled-components";
import { props } from "./props";
import { StoryFn } from "@storybook/react";
import { themes } from "@mocks/design/themes";

import { Spinner, SpinnerProps } from ".";

const story = {
  title: "design/feedback/Spinner",
  components: [Spinner],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<SpinnerProps> = (args) => <Spinner {...args} />;
Default.args = {
  appearance: "primary",
  size: "small",
  track: true,
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<SpinnerProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Spinner {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
