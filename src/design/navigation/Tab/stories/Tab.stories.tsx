import { ThemeProvider } from "styled-components";
import { Tab, ITabProps } from "../index";
import { TabController } from "./TabController";
import { props } from "../props";
import { themes } from "@mocks/design/themes";

const story = {
  title: "design/navigation/Tab",
  components: [Tab],
  tags: ["autodocs"],
  argTypes: props,
};

const Default = (args: ITabProps) => <TabController {...args} />;
Default.args = {
  id: "id",
  disabled: false,
  label: "General Information",
  selected: { control: null },
};

const theme = {
  ...themes["fondecom"],
};

const Themed = (args: ITabProps) => (
  <ThemeProvider theme={theme}>
    <TabController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;

export { Default, Themed };
