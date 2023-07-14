import { BrowserRouter } from "react-router-dom";
import { QuickAccess } from ".";

import { fondecom } from "../../../mocks/theme";

import {
  MdAttachMoney,
  MdCurrencyExchange,
  MdHistory,
  MdOutlineAddHome,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { props } from "./props";
import { ThemeProvider } from "styled-components";

const story = {
  title: "components/cards/QuickAccess",
  components: [QuickAccess],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args) => (
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
      label: "Abrir CDT",
      path: "/cdt",
    },
    {
      icon: <MdOutlineSupportAgent />,
      label: "Atención en línea",
      path: "/support",
    },
  ],
};

const theme = {
  ...fondecom,
};

export const Themed = (args) => (
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
