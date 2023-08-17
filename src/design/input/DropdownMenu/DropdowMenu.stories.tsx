import { DropdownMenu, DropdownMenuProps } from ".";
import { props } from "./props";

import { fondecom } from "@mocks/design/themes/fondecom";
import { ThemeProvider } from "styled-components";

const story = {
  title: "design/input/DropdownMenu",
  component: [DropdownMenu],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args: DropdownMenuProps) => <DropdownMenu {...args} />;
Default.args = {
  options: [
    {
      id: "CE995433",
      isFocused: false,
      htmlFor: "/",
      children: "Crédito educativo - CE995433",
    },
    {
      id: "CL002807",
      isFocused: false,
      htmlFor: "/",
      children: "Crédito libre inversión - CL002807",
    },
    {
      id: "CL002808",
      isDisabled: true,
      htmlFor: "/",
      children: "Crédito libre inversión - CL002808",
    },
  ],
};

const theme = {
  ...fondecom,
};

export const Themed = (args: DropdownMenuProps) => (
  <ThemeProvider theme={theme}>
    <DropdownMenu {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
