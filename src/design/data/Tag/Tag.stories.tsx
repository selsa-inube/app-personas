import { ThemeProvider } from "styled-components";

import { Tag, TagProps } from ".";

import { fondecom } from "@mocks/theme";
import { props } from "./props";

const story = {
  title: "design/data/Tag",
  components: [Tag],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args: TagProps) => <Tag {...args} />;
Default.args = {
  label: "Pending",
  appearance: "gray",
};

const theme = {
  ...fondecom,
};

export const Themed = (args: TagProps) => (
  <ThemeProvider theme={theme}>
    <Tag {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
