import { ThemeProvider } from "styled-components";
import { Text, TextProps } from ".";

import { fondecom } from "@mocks/theme";
import { props } from "./props";

const story = {
  title: "design/data/Text",
  components: [Text],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args: TextProps) => (
  <Text {...args}>This is a paragraph</Text>
);
Default.args = {
  as: "p",
  margin: "0px",
  padding: "0px",
  appearance: "dark",
  type: "body",
  size: "large",
  textAlign: "start",
  cursorHover: false,
  parentHover: false,
  disabled: false,
};

const theme = {
  ...fondecom,
};

export const Themed = (args: TextProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Text {...args}>This is a paragraph</Text>
    </ThemeProvider>
  );
};

Themed.args = {
  ...Default.args,
};

export default story;
