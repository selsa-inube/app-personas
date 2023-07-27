import { BrowserRouter } from "react-router-dom";
import {
  MdHouse,
  MdAccountBalanceWallet,
  MdFactCheck,
  MdAttachMoney,
  MdOutlineAddCard,
  MdOutlineAirplaneTicket,
} from "react-icons/md";
import { StoryFn } from "@storybook/react";

import { Nav, NavProps } from ".";
import { props } from "./props";
import { fondecom } from "../../../mocks/theme";

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

export const Default = (args: NavProps) => (
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

export const MultipleSections = (args: NavProps) => (
  <BrowserRouter>
    <Nav {...args} />
  </BrowserRouter>
);
MultipleSections.args = {
  title: Default.args.title,
  sections: [
    ...Default.args.sections,
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
  currentLocation: Default.args.currentLocation,
};

const theme = {
  ...fondecom,
};

export const Themed = (args: NavProps) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Nav {...args} />
    </BrowserRouter>
  </ThemeProvider>
);

Themed.args = { ...MultipleSections.args };

export default story;
