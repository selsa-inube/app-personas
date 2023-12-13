import { Tabs, TabsProps } from "..";
import { TabsController } from "./TabsController";
import { ThemeProvider } from "styled-components";
import { props, parameters } from "../props";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";

const story = {
  title: "design/navigation/Tabs",
  components: [Tabs],
  tags: ["autodocs"],
  argTypes: props,
  parameters,
};

const Default: StoryFn<TabsProps> = (args) => <TabsController {...args} />;
Default.args = {
  tabs: [
    {
      id: "generalInformation",
      label: "General Information",
    },
    { id: "branches", label: "Branches" },
    { id: "projects", label: "Projects" },
    { id: "events", isDisabled: true, label: "Events" },
    { id: "aidBudget", label: "Aid budget units" },
    { id: "payroll", label: "Payroll" },
  ],
  selectedTab: "generalInformation",
};

const theme = {
  ...themes["fondecom"],
};

const Themed: StoryFn<TabsProps> = (args) => (
  <ThemeProvider theme={theme}>
    <TabsController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};
export default story;
export { Default, Themed };
