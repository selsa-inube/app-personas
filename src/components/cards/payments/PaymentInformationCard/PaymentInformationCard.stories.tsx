import { StoryFn } from "@storybook/react";
import { PaymentInformationCard, PaymentInformationCardProps } from ".";
import { props } from "./props";

import { themesMock } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";

const story = {
  title: "components/cards/PaymentInformationCard",
  component: [PaymentInformationCard],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<PaymentInformationCardProps> = (args) => (
  <PaymentInformationCard {...args} />
);
Default.args = {
  id: "1",
  title: "CREDI-APORTES GASTOS PERSONALES",
  description: "Próximo vencimiento",
  value: 150000,
};

const theme = {
  ...themesMock.prosel,
};

export const Themed: StoryFn<PaymentInformationCardProps> = (args) => (
  <ThemeProvider theme={theme}>
    <PaymentInformationCard {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
