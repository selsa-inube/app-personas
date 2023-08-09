import { ThemeProvider } from "styled-components";
import { props } from "./props";

import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { BoxAttribute, BoxAttributeProps } from ".";

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

export const Default = (args: BoxAttributeProps) => <BoxAttribute {...args} />;
Default.args = {
  label: "Label",
  value: "Value",
};

export const Themed = (args: BoxAttributeProps) => (
  <ThemeProvider theme={themes["fondecom"]}>
    <BoxAttribute {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
