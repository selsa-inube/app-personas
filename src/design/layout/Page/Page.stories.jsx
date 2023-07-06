import { BrowserRouter } from "react-router-dom";
import { Page } from ".";

import {
  MdHouse,
  MdAccountBalanceWallet,
  MdFactCheck,
  MdAttachMoney,
  MdOutlineAddCard,
  MdOutlineAirplaneTicket,
} from "react-icons/md";
import { ThemeProvider } from "styled-components";
import { fondecom } from "../../../mocks/theme";
import { props } from "./props";

const story = {
  title: "design/layout/Page",
  components: [Page],
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    ...props,
  },
};

export const Default = (args) => (
  <BrowserRouter>
    <Page {...args} />
  </BrowserRouter>
);
Default.args = {
  header: {
    logoURL: "http://www.sistemasenlinea.com.co/images/logos/selsalogo2.png",
    username: "Leonardo Garzón",
    client: "Fondecom",
  },
  nav: {
    sections: [
      {
        title: "Administrate",
        links: [
          {
            label: "Home",
            path: "/",
            icon: <MdHouse />,
          },
          {
            label: "Accounts",
            path: "/accounts",
            icon: <MdAccountBalanceWallet />,
          },
          {
            label: "Products",
            path: "/products",
            icon: <MdFactCheck />,
          },
        ],
      },
      {
        title: "Request",
        links: [
          {
            label: "Credit",
            path: "/credit",
            icon: <MdAttachMoney />,
          },
          {
            label: "Savings",
            path: "/savings",
            icon: <MdOutlineAddCard />,
          },
          {
            label: "Holidays",
            path: "/holidays",
            icon: <MdOutlineAirplaneTicket />,
          },
        ],
      },
    ],
  },
  currentLocation: "/",
};

const theme = {
  ...fondecom,
};

export const Themed = (args) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Page {...args} />
    </BrowserRouter>
  </ThemeProvider>
);

Themed.args = {
  header: {
    ...Default.args.header,
    logoURL:
      "https://fondecom.coop/wp-content/uploads/2022/07/LOGO-GRANDE-1024x305.png",
  },
  nav: { ...Default.args.nav },
  currentLocation: "/",
};

export default story;
