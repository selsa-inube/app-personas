import { BrowserRouter } from "react-router-dom";
import { QuickAccess, QuickAccessProps } from ".";
import { StoryFn } from "@storybook/react";

import { themes } from "@mocks/design/themes";

import {
  MdAttachMoney,
  MdCurrencyExchange,
  MdHistory,
  MdOutlineAddHome,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { ThemeProvider } from "styled-components";
import { props } from "./props";

const story = {
  title: "components/cards/QuickAccess",
  components: [QuickAccess],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<QuickAccessProps> = (args) => (
  <BrowserRouter>
    <QuickAccess {...args} />
  </BrowserRouter>
);
Default.args = {
  links: [
    {
      icon: <MdAttachMoney />,
      label: "Paga tus créditos",
      path: "/payments",
    },
    {
      icon: <MdCurrencyExchange />,
      label: "Transferir dinero",
      path: "/transfer",
    },
    {
      icon: <MdHistory />,
      label: "Mis pagos automáticos",
      path: "/debit",
    },
    {
      icon: <MdOutlineAddHome />,
      label: "Abrir CDAT",
      path: "/cdat",
    },
    {
      icon: <MdOutlineSupportAgent />,
      label: "Atención en línea",
      path: "/support",
    },
  ],
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<QuickAccessProps> = (args) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <QuickAccess {...args} />
    </ThemeProvider>
  </BrowserRouter>
);
Themed.args = {
  ...Default.args,
};

export default story;
