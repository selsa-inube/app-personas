import { ThemeProvider } from "styled-components";
import { Text } from ".";

import { fondecom } from "../../../mocks/theme";
import { props } from "./props";

const story = {
  title: "design/data/Text",
  components: [Text],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args) => <Text {...args}>This is a paragraph</Text>;
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
};

const theme = {
  ...fondecom,
};

export const Themed = (args) => {
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
