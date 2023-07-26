import { ThemeProvider } from "styled-components";
import { props } from "./props";

import { fondecom } from "../../../mocks/theme";

import { Spinner, SpinnerProps } from ".";

const story = {
  title: "design/feedback/Spinner",
  components: [Spinner],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args: SpinnerProps) => <Spinner {...args} />;
Default.args = {
  appearance: "primary",
  size: "small",
  track: true,
};

const theme = {
  ...fondecom,
};

export const Themed = (args: SpinnerProps) => (
  <ThemeProvider theme={theme}>
    <Spinner {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
