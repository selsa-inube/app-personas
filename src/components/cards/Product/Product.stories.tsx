import { ThemeProvider } from "styled-components";
import { Product, ProductProps } from ".";
import { props } from "./props";

import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

const story = {
  title: "components/cards/Product",
  components: [Product],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default: StoryFn<ProductProps> = (args) => <Product {...args} />;
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
  icon: <MdOutlineAccountBalanceWallet />,
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<ProductProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Product {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
