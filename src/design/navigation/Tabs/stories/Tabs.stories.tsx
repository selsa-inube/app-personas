import { Tabs, ITabsProps } from "..";
import { TabsController } from "./TabsController";
import { ThemeProvider } from "styled-components";
import { props, parameters } from "../props";
import { themes } from "@mocks/design/themes";

const story = {
  title: "design/navigation/Tabs",
  components: [Tabs],
  tags: ["autodocs"],
  argTypes: props,
  parameters,
};

const Default = (args: ITabsProps) => <TabsController {...args} />;
Default.args = {
  tabs: [
    {
      id: "generalInformation",
      disabled: false,
      label: "General Information",
    },
    { id: "branches", disabled: false, label: "Branches" },
    { id: "projects", disabled: false, label: "Projects" },
    { id: "events", disabled: true, label: "Events" },
    { id: "aidBudget", disabled: false, label: "Aid budget units" },
    { id: "payroll", disabled: false, label: "Payroll" },
  ],
  selectedTab: "generalInformation",
};

const theme = {
  ...themes["fondecom"],
};

const Themed = (args: ITabsProps) => (
  <ThemeProvider theme={theme}>
    <TabsController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};
export default story;
export { Default, Themed };
