import { ThemeProvider } from "styled-components";
import { User, UserProps } from ".";
import { fondecom } from "../../../mocks/theme";
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
  ...fondecom,
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
