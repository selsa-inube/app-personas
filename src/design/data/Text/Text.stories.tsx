import { ThemeProvider } from "styled-components";
import { Text, TextProps } from ".";
import { StoryFn } from "@storybook/react";
import { themes } from "@mocks/design/themes";
import { props } from "./props";

const story = {
  title: "design/data/Text",
  components: [Text],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<TextProps> = (args) => (
  <Text {...args}>This is a paragraph</Text>
);
Default.args = {
  as: "p",
  margin: "s0",
  padding: "s0",
  appearance: "dark",
  type: "body",
  size: "large",
  textAlign: "start",
  cursorHover: false,
  parentHover: false,
  disabled: false,
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<TextProps> = (args) => {
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
