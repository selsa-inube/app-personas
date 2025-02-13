import { StoryFn } from "@storybook/react";
import { PaymentCard, PaymentCardProps } from ".";
import { props } from "./props";

import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { EPaymentOptionType } from "@pages/admin/payments/Pay/types";
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
      id: EPaymentOptionType.EXPIREDVALUE,
      label: "Valor vencido",
      value: 0,
    },
    {
      id: EPaymentOptionType.NEXTVALUE,
      label: "Próximo vencimiento",
      description: "15/Abr/2024",
      value: 150000,
    },
    {
      id: EPaymentOptionType.TOTALVALUE,
      label: "Pago total",
      value: 828022,
    },
  ],
  tags: [
    {
      label: "Mensual",
      appearance: "primary",
    },
  ],
  allowCustomValue: true,
  onChangePaymentValue: () => true,
  onApplyPayOption: () => true,
};

const theme = {
  ...themes[enviroment.BUSINESS_UNIT],
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
