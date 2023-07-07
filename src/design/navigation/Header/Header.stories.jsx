import { ThemeProvider } from "styled-components";
import { Header } from ".";
import { fondecom } from "../../../mocks/theme";
import { props } from "./props";

const story = {
  title: "design/navigation/Header",
  components: [Header],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args) => <Header {...args} />;
Default.args = {
  logoURL: "http://www.sistemasenlinea.com.co/images/selsalogo-small-grey.png",
  username: "Leonardo Garzón",
  client: "Fondecom",
};

const theme = {
  ...fondecom,
};

export const Themed = (args) => (
  <ThemeProvider theme={theme}>
    <Header {...args} />
  </ThemeProvider>
);
Themed.args = {
  logoURL:
    "https://fondecom.coop/wp-content/uploads/2022/07/LOGO-GRANDE-1024x305.png",
  username: "Leonardo Garzón",
};

export default story;
