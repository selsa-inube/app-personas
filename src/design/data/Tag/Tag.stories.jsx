import { ThemeProvider } from "styled-components";

import { Tag } from ".";

import { props } from "./props";
import { fondecom } from "../../../mocks/theme";

const story = {
  title: "design/data/Tag",
  components: [Tag],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args) => <Tag {...args} />;
Default.args = {
  label: "Pending",
  appearance: "gray",
};

const theme = {
  ...fondecom,
};

export const Themed = (args) => (
  <ThemeProvider theme={theme}>
    <Tag {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
