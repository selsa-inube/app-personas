import { StoryFn } from "@storybook/react";
import { PaymentCard, PaymentCardProps } from ".";
import { props } from "./props";

import { fondecom } from "@mocks/design/themes/fondecom";
import { ThemeProvider } from "styled-components";

const story = {
  title: "components/cards/PaymentCard",
  component: [PaymentCard],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<PaymentCardProps> = (args) => (
  <PaymentCard {...args} />
);
Default.args = {
  id: "10-241000476",
  title: "CREDI-APORTES GASTOS PERSONALES",
  options: [
    {
      id: "expiredValue",
      label: "Valor vencido",
      value: 0,
    },
    {
      id: "nextValue",
      label: "Próximo vencimiento",
      description: "15/Abr/2024",
      value: 150000,
    },
    {
      id: "totalValue",
      label: "Pago total",
      value: 828022,
    },
  ],
  tags: [
    {
      label: "Fondecom mensual",
      appearance: "primary",
      modifier: "clear",
      textAppearance: "primary",
    },
  ],
  allowCustomValue: true,
  onChangePaymentValue: () => true,
  onApplyPayOption: () => true,
};

const theme = {
  ...fondecom,
};

export const Themed: StoryFn<PaymentCardProps> = (args) => (
  <ThemeProvider theme={theme}>
    <PaymentCard {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
