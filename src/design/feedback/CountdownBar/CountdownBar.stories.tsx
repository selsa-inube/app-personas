import { ThemeProvider } from "styled-components";
import { CountdownBar, CountdownBarProps } from ".";
import { action } from "@storybook/addon-actions";
import { props, parameters } from "./props";
import { fondecom } from "@mocks/design/themes/fondecom";
import { inube } from "@design/tokens";
import { StoryFn } from "@storybook/react";

const story = {
  title: "design/feedback/CountdownBar",
  components: [CountdownBar],
  parameters,
  argTypes: {
    ...props,
    onCountdown: { action: "onAnimationEnd" },
  },
};

export const Default: StoryFn<CountdownBarProps> = (args) => (
  <CountdownBar {...args} />
);

Default.args = {
  height: inube.spacing.s050,
  appearance: "primary",
  duration: 3000,
  paused: false,
  onCountdown: action("onAnimationEnd"),
};

const theme = {
  ...fondecom,
};

export const Themed: StoryFn<CountdownBarProps> = (args) => (
  <ThemeProvider theme={theme}>
    <CountdownBar {...args} />
  </ThemeProvider>
);

export default story;
