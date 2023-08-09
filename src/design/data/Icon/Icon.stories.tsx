import { MdHouse } from "react-icons/md";
import { Icon, IconProps } from ".";

import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";
import { props } from "./props";

const story = {
  title: "design/data/Icon",
  components: [Icon],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args: IconProps) => <Icon {...args} />;
Default.args = {
  icon: <MdHouse />,
  appearance: "primary",
  size: "24px",
  spacing: "wide",
  shape: "rectangle",
  variant: "none",
  cursorHover: false,
  parentHover: false,
  disabled: false,
};

const theme = {
  ...themes['fondecom'],
};

export const Themed = (args: IconProps) => (
  <ThemeProvider theme={theme}>
    <Icon {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
