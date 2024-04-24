import { StoryFn } from "@storybook/react";
import { PaymentHistoryCard, PaymentHistoryCardProps } from ".";
import { props } from "./props";

import { fondecom } from "@mocks/design/themes/fondecom";
import { ThemeProvider } from "styled-components";

const story = {
  title: "components/cards/PaymentHistoryCard",
  component: [PaymentHistoryCard],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<PaymentHistoryCardProps> = (args) => (
  <PaymentHistoryCard {...args} />
);
Default.args = {
  id: "558907643-1",
  title: "Pago PRE-LIQUIDACIÓN WEB",
  value: 645000,
  paymentDate: new Date("30/Mar/2024 11:20 am"),
  paymentType: "Pagar con débito a una cuenta de ahorros",
  cus: "558907643",
  tag: {
    label: "En progreso",
    appearance: "warning",
    textAppearance: "warning",
    modifier: "clear",
  },
};

const theme = {
  ...fondecom,
};

export const Themed: StoryFn<PaymentHistoryCardProps> = (args) => (
  <ThemeProvider theme={theme}>
    <PaymentHistoryCard {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
