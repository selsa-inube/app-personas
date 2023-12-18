import { ThemeProvider } from "styled-components";
import { Tab, TabProps } from "../index";
import { TabController } from "./TabController";
import { props } from "../props";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";

const story = {
  title: "design/navigation/Tab",
  components: [Tab],
  tags: ["autodocs"],
  argTypes: props,
};

const Default: StoryFn<TabProps> = (args) => <TabController {...args} />;
Default.args = {
  id: "id",
  label: "General Information",
  isDisabled: false,
  isSelected: true,
};

const theme = {
  ...themes["fondecom"],
};

const Themed: StoryFn<TabProps> = (args) => (
  <ThemeProvider theme={theme}>
    <TabController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;

export { Default, Themed };
