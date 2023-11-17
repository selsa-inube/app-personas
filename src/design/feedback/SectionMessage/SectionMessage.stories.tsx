import { ThemeProvider } from "styled-components";
import { action } from "@storybook/addon-actions";
import { props, parameters } from "./props";
import { fondecom } from "@mocks/design/themes/fondecom";

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

const Default = (args: SectionMessageProps) => <SectionMessage {...args} />;
const closeSectionMessage = () => {
  action("SectionMessage closed")();
};
Default.args = {
  title: "Title",
  description: "Description",
  icon: <MdWarning />,
  duration: 10000,
  closeSectionMessage: closeSectionMessage,
};

const theme = {
  ...fondecom,
};

const Themed = (args: SectionMessageProps) => (
  <ThemeProvider theme={theme}>
    <SectionMessage {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;

export { Default, Themed };
