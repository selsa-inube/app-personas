import { ThemeProvider } from "styled-components";
import { Product } from ".";
import { props } from "./props";

import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import { fondecom } from "../../../mocks/theme";

const story = {
  title: "components/cards/Product",
  components: [Product],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args) => <Product {...args} />;
Default.args = {
  title: "Crédito educativo",
  description: "09-786238-77",
  attributes: [
    {
      label: "Valor próximo pago",
      value: "$500.000",
    },
    {
      label: "Fecha próximo pago",
      value: "02/ABR/2023",
    },
    {
      label: "Saldo total",
      value: "$1.225.000",
    },
  ],
  tags: [
    {
      label: "En mora",
      appearance: "error",
    },
  ],
  empty: false,
  icon: <MdOutlineAccountBalanceWallet />,
};

const theme = {
  ...fondecom,
};

export const Themed = (args) => (
  <ThemeProvider theme={theme}>
    <Product {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
