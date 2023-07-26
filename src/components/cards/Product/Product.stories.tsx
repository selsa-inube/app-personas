import { ThemeProvider } from "styled-components";
import { Product, ProductProps } from ".";
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

export const Default = (args: ProductProps) => <Product {...args} />;
Default.args = {
  title: "Crédito educativo",
  description: "09-786238-77",
  attributes: [
    {
      id: "next_payment_value",
      label: "Próximo pago",
      value: "$500.000",
    },
    {
      id: "next_payment_date",
      label: "Próxima fecha",
      value: "02/ABR/2023",
    },
    {
      id: "net_value",
      label: "Saldo total",
      value: "$1.225.000",
    },
  ],
  breakpoints: {
    "(min-width: 1000px)": 3,
    "(min-width: 800px)": 2,
    "(max-width: 810px)": 1,
  },
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

export const Themed = (args: ProductProps) => (
  <ThemeProvider theme={theme}>
    <Product {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
