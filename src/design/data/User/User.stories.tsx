import { themes } from "@mocks/design/themes";
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

export const Default = (args: UserProps) => <User {...args} />;
Default.args = {
  username: "Leonardo Garzón",
  client: "Fondecom",
};

const theme = {
  ...themes['fondecom'],
};

export const Themed = (args: UserProps) => (
  <ThemeProvider theme={theme}>
    <User {...args} />
  </ThemeProvider>
);

Themed.args = {
  username: "Leonardo Garzón",
};

export default story;
