import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";
import { User, UserProps } from ".";
import { props } from "./props";
import { StoryFn } from "@storybook/react";

const story = {
  title: "design/data/User",
  components: [User],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<UserProps> = (args) => <User {...args} />;
Default.args = {
  username: "Leonardo Garzón",
  businessUnit: "Fondecom",
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<UserProps> = (args) => (
  <ThemeProvider theme={theme}>
    <User {...args} />
  </ThemeProvider>
);

Themed.args = {
  username: "Leonardo Garzón",
};

export default story;
