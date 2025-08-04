import { ThemeProvider } from "styled-components";
import { props } from "./props";

import { StoryFn } from "@storybook/react";
import { MdAndroid } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { BoxAttribute, BoxAttributeProps } from ".";
import { themesMock } from "@mocks/design/themes";

const story = {
  title: "components/cards/BoxAttribute",
  components: [BoxAttribute],
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
