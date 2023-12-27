import { StoryFn } from "@storybook/react";
import {
  MdAccountBalanceWallet,
  MdAttachMoney,
  MdFactCheck,
  MdHouse,
  MdOutlineAddCard,
  MdOutlineAirplaneTicket,
} from "react-icons/md";
import { BrowserRouter } from "react-router-dom";

import { themes } from "@mocks/design/themes";
import { Nav, NavProps } from ".";
import { props } from "./props";

import { ThemeProvider } from "styled-components";

const story = {
  title: "design/navigation/Nav",
  components: [Nav],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export const Default: StoryFn<NavProps> = (args) => (
  <BrowserRouter>
    <Nav {...args} />
  </BrowserRouter>
);
Default.args = {
  title: "Menu",
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
  ],
  currentLocation: "/",
};

export const MultipleSections: StoryFn<NavProps> = (args) => (
  <BrowserRouter>
    <Nav {...args} />
  </BrowserRouter>
);
MultipleSections.args = {
  title: "Menu",
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
  currentLocation: "/",
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<NavProps> = (args) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Nav {...args} />
    </BrowserRouter>
  </ThemeProvider>
);

Themed.args = { ...MultipleSections.args };

export default story;
