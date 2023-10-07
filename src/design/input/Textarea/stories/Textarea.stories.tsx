import { ThemeProvider } from "styled-components";

import { fondecom } from "@mocks/design/themes/fondecom";
import { props, parameters } from "../props";
import { ITextareaProps, Textarea } from "..";
import { TextareaController } from "./TextareaController";

const story = {
  title: "design/input/Textarea",
  components: [Textarea],
  tags: ["autodocs"],
  parameters,
  argTypes: props,
};

const Default = (args: ITextareaProps) => <TextareaController {...args} />;
Default.args = {
  label: "Textarea",
  name: "textarea",
  id: "textarea",
  placeholder: "Storybook Textarea",
  disabled: false,
  fullwidth: false,
  required: true,
  maxLength: 220,
  value:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil veniam, reiciendis ipsum itaque unde odio voluptatum ab cumque deleniti dolore magnam quas hic rem, mollitia adipisci. Officiis accusamus aut consectetur",
};

const theme = {
  ...fondecom,
};

const Themed = (args: ITextareaProps) => (
  <ThemeProvider theme={theme}>
    <TextareaController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
export { Default, Themed };
