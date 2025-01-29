import { ThemeProvider } from "styled-components";

import { StoryFn } from "@storybook/react";
import { Textarea, TextareaProps } from "..";
import { parameters, props } from "../props";
import { TextareaController } from "./TextareaController";
import { themes } from "@mocks/design/themes";

const story = {
  title: "design/input/Textarea",
  components: [Textarea],
  tags: ["autodocs"],
  parameters,
  argTypes: props,
};

const Default: StoryFn<TextareaProps> = (args) => (
  <TextareaController {...args} />
);
Default.args = {
  label: "Textarea",
  name: "textarea",
  id: "textarea",
  placeholder: "Storybook Textarea",
  disabled: false,
  fullwidth: false,
  required: true,
  maxLength: 220,
  lengthThreshold: 50,
  withCounter: true,
  value:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil veniam, reiciendis ipsum itaque unde odio voluptatum ab cumque deleniti dolore magnam quas hic rem, mollitia adipisci. Officiis accusamus aut consectetur",
};

const theme = {
  ...themes["fondecom"],
};

const Themed: StoryFn<TextareaProps> = (args) => (
  <ThemeProvider theme={theme}>
    <TextareaController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
export { Default, Themed };
