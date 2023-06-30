import { ThemeProvider } from "styled-components";
import { Header } from ".";
import { fondecom } from "../../../mocks/theme";

const story = {
  title: "design/navigation/Header",
  components: [Header],
};

export const Default = () => (
  <Header
    logoURL="http://www.sistemasenlinea.com.co/images/selsalogo-small-grey.png"
    username="Leonardo Garzón"
    businessUnit="Fondecom"
  />
);

const theme = {
  ...fondecom,
};

export const Themed = () => (
  <ThemeProvider theme={theme}>
    <Header
      logoURL="https://fondecom.coop/wp-content/uploads/2022/07/LOGO-GRANDE-1024x305.png"
      username="Leonardo Garzón"
    />
  </ThemeProvider>
);

export default story;
