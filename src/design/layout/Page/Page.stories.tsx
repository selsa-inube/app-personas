import { enviroment } from "@config/enviroment";
import { themesMock } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react-vite";
import {
  MdAccountBalanceWallet,
  MdAttachMoney,
  MdFactCheck,
  MdHouse,
  MdOutlineAddCard,
  MdOutlineAirplaneTicket,
} from "react-icons/md";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { Page } from ".";
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

const defaultArgs = {
  header: {
    logoURL: "http://www.sistemasenlinea.com.co/images/logos/selsalogo2.png",
    username: "Leonardo Garzón",
    client: enviroment.CLIENT_NAME,
    portalId: "portal",
    logoutPath: "logoutPath",
    logoutTitle: "logoutTitle",
    navigation: {
      title: "navigationTitle",
      sections: [
        {
          title: "Administrate",
          links: [
            { label: "Home", path: "/", icon: <MdHouse /> },
            {
              label: "Accounts",
              path: "/accounts",
              icon: <MdAccountBalanceWallet />,
            },
            { label: "Products", path: "/products", icon: <MdFactCheck /> },
          ],
        },
        {
          title: "Request",
          links: [
            { label: "Credit", path: "/credits", icon: <MdAttachMoney /> },
            { label: "Savings", path: "/savings", icon: <MdOutlineAddCard /> },
            {
              label: "Holidays",
              path: "/holidays",
              icon: <MdOutlineAirplaneTicket />,
            },
          ],
        },
      ],
    },
  },
  nav: {
    sections: [
      {
        title: "Administrate",
        links: [
          { label: "Home", path: "/", icon: <MdHouse /> },
          {
            label: "Accounts",
            path: "/accounts",
            icon: <MdAccountBalanceWallet />,
          },
          { label: "Products", path: "/products", icon: <MdFactCheck /> },
        ],
      },
      {
        title: "Request",
        links: [
          { label: "Credit", path: "/credits", icon: <MdAttachMoney /> },
          { label: "Savings", path: "/savings", icon: <MdOutlineAddCard /> },
          {
            label: "Holidays",
            path: "/holidays",
            icon: <MdOutlineAirplaneTicket />,
          },
        ],
      },
    ],
  },
};

export const Default: StoryFn = (args) => (
  <BrowserRouter>
    <Page {...args} />
  </BrowserRouter>
);
Default.args = defaultArgs;

const themedArgs = {
  ...defaultArgs,
  header: {
    ...defaultArgs.header,
  },
  nav: {
    ...defaultArgs.nav,
  },
};

const theme = { ...themesMock.prosel };

export const Themed: StoryFn = (args) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Page {...args} />
    </BrowserRouter>
  </ThemeProvider>
);
Themed.args = themedArgs;

export default story;
