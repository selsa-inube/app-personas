import { ThemeProvider } from "styled-components";
import { CurrentConsumption, CurrentConsumptionProps } from ".";

import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { EProductType } from "src/model/entity/product";
import { props } from "./props";

const story = {
  title: "components/cards/CurrentConsumption",
  components: [CurrentConsumption],
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

export const Default: StoryFn<CurrentConsumptionProps> = (args) => (
  <CurrentConsumption {...args} />
);
Default.args = {
  isTablet: false,
  consumptions: [
    {
      id: "123412341",
      title: "Compra RESTAURANTE YANUBA",
      description: "Informe de consumos",
      type: EProductType.CREDIT,
      attributes: [
        {
          id: "consumption_date",
          label: "Fecha de consumo",
          value: "2024-02-21",
        },
        {
          id: "consumption_value",
          label: "Valor del consumo",
          value: 250000,
        },
        {
          id: "interest",
          label: "Interés corriente",
          value: "% 2.51 MV",
        },
        {
          id: "next_payment_interest",
          label: "Cuota mínima disponible",
          value: 50000,
        },
        {
          id: "total_payment_interest",
          label: "Total cuota disponible",
          value: 50000,
        },
        {
          id: "capital",
          label: "Pago de capital",
          value: "cuota 1/24",
        },
        {
          id: "next_payment_capital",
          label: "Pago de capital mínimo",
          value: 25000,
        },
        {
          id: "total_payment_capital",
          label: "Pago de capital total",
          value: 80000,
        },
        {
          id: "penalty_interest",
          label: "Interés de mora",
          value: 0,
        },
      ],
      movements: [
        {
          id: "movementConsumption-1",
          date: new Date("2024-03-15"),
          reference: "CT1001210",
          description: "Pago periódico",
          totalValue: 22000,
        },
      ],
    },
  ],
  navigateToDetails: "123412341",
};

const theme = {
  ...themes[enviroment.BUSINESS_UNIT],
};

export const Themed: StoryFn<CurrentConsumptionProps> = (args) => (
  <ThemeProvider theme={theme}>
    <CurrentConsumption {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
