import { BrowserRouter } from "react-router-dom";
import { QuickAccess } from ".";

import {
  MdAttachMoney,
  MdCurrencyExchange,
  MdHistory,
  MdOutlineAddHome,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { props } from "./props";

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

export default story;
