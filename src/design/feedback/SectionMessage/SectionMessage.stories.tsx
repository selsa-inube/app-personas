import { ThemeProvider } from "styled-components";
import { action } from "@storybook/addon-actions";
import { props, parameters } from "./props";
import { fondecom } from "@mocks/design/themes/fondecom";
import { StoryFn } from "@storybook/react";
import { SectionMessageProps, SectionMessage } from ".";
import { MdWarning } from "react-icons/md";

const story = {
  title: "design/feedback/SectionMessage",
  components: [SectionMessage],
  parameters,
  argTypes: {
    ...props,
  },
};

const Default: StoryFn<SectionMessageProps> = (args) => (
  <SectionMessage {...args} />
);
const closeSectionMessage = () => {
  action("SectionMessage closed")();
};
Default.args = {
  title: "Title",
  description: "Description",
  icon: <MdWarning />,
  duration: 10000,
  onClose: closeSectionMessage,
};

const theme = {
  ...fondecom,
};

const Themed: StoryFn<SectionMessageProps> = (args) => (
  <ThemeProvider theme={theme}>
    <SectionMessage {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;

export { Default, Themed };
