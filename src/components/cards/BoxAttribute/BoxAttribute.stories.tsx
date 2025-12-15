import { ThemeProvider } from "styled-components";
import { props } from "./props";

import { themesMock } from "@mocks/design/themes";
import type { Decorator } from "@storybook/react-vite";
import { StoryFn } from "@storybook/react-vite";
import { MdAndroid } from "react-icons/md";
import { BrowserRouter } from "react-router";
import { BoxAttribute, BoxAttributeProps } from ".";

const decorators: Decorator[] = [
  (Story) => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  ),
];

const story = {
  title: "components/cards/BoxAttribute",
  components: [BoxAttribute],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  decorators,
};

export const Default: StoryFn<BoxAttributeProps> = (args) => (
  <BoxAttribute {...args} />
);
Default.args = {
  label: "Label",
  value: "Value",
};

export const WithButton: StoryFn<BoxAttributeProps> = (args) => (
  <BoxAttribute {...args} />
);

WithButton.args = {
  label: "Label",
  value: "Value",
  withButton: true,
  buttonValue: 2,
  buttonIcon: <MdAndroid />,
};

export const Themed: StoryFn<BoxAttributeProps> = (args) => (
  <ThemeProvider theme={themesMock.prosel}>
    <BoxAttribute {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
