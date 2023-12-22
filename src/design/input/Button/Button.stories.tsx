import { Button, ButtonProps } from ".";

import { MdAdd, MdChevronRight } from "react-icons/md";
import { props } from "./props";

import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

const story = {
  title: "design/input/Button",
  component: [Button],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default: StoryFn<ButtonProps> = (args) => <Button {...args} />;
Default.args = {
  children: "Button",
  type: "button",
  iconBefore: <MdAdd />,
  iconAfter: <MdChevronRight />,
  appearance: "primary",
  variant: "filled",
  spacing: "wide",
  fullwidth: false,
  disabled: false,
  load: false,
  path: "/some-path",
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<ButtonProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Button {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
