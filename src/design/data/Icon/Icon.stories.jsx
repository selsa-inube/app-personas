import { Icon } from ".";
import { MdHouse } from "react-icons/md";

import { props } from "./props";
import { ThemeProvider } from "styled-components";
import { fondecom } from "../../../mocks/theme";

const story = {
  title: "design/data/Icon",
  components: [Icon],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args) => <Icon {...args} />;
Default.args = {
  icon: <MdHouse />,
  appearance: "primary",
  size: "24px",
  spacing: "wide",
  shape: "rectangle",
  variant: "none",
  allowHover: false,
};

const theme = {
  ...fondecom,
};

export const Themed = (args) => (
  <ThemeProvider theme={theme}>
    <Icon {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
