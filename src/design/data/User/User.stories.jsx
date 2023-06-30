import { ThemeProvider } from "styled-components";
import { User } from ".";
import { fondecom } from "../../../mocks/theme";

const story = {
  title: "design/data/User",
  components: [User],
};

export const Default = () => (
  <User username="Leonardo Garzón" businessUnit="Fondecom" />
);

const theme = {
  ...fondecom,
};

export const Themed = () => (
  <ThemeProvider theme={theme}>
    <User username="Leonardo Garzón" />
  </ThemeProvider>
);

export default story;
