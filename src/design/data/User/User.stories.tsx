import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { User, UserProps } from ".";
import { props } from "./props";

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
  businessUnit: enviroment.CLIENT_NAME,
};

const theme = {
  ...themes[enviroment.BUSINESS_UNIT],
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
