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

export const Default = (args: ButtonProps) => <Button {...args} />;
Default.args = {
  children: "Button",
  iconBefore: <MdAdd />,
  iconAfter: <MdChevronRight />,
  appearance: "primary",
  variant: "filled",
  spacing: "wide",
  fullwidth: false,
  disabled: false,
  load: false,
};

const theme = {
  ...themes["fondecom"],
};

export const WithLink = (args: ButtonProps) => (
  <Button {...args} type="link" path="/some-path" />
);

export const Themed = (args: ButtonProps) => (
  <ThemeProvider theme={theme}>
    <Button {...args} />
  </ThemeProvider>
);

WithLink.args = {
  ...Default.args,
};

Themed.args = {
  ...Default.args,
};

export default story;
