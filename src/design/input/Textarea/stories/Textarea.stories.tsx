import { ThemeProvider } from "styled-components";

import { fondecom } from "@mocks/design/themes/fondecom";
import { props, parameters } from "../props";
import { TextareaProps, Textarea } from "..";
import { TextareaController } from "./TextareaController";
import { StoryFn } from "@storybook/react";

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
  isDisabled: false,
  isFullWidth: false,
  isRequired: true,
  maxLength: 220,
  value:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil veniam, reiciendis ipsum itaque unde odio voluptatum ab cumque deleniti dolore magnam quas hic rem, mollitia adipisci. Officiis accusamus aut consectetur",
};

const theme = {
  ...fondecom,
};

const Themed = (args: TextareaProps) => (
  <ThemeProvider theme={theme}>
    <TextareaController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
export { Default, Themed };
