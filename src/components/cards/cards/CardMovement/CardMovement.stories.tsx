import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { EMovementType } from "src/model/entity/product";
import { ThemeProvider } from "styled-components";
import { CardMovement, CardMovementProps } from ".";
import { parameters, props } from "./props";

const story = {
  title: "components/cards/CardMovement",
  component: [CardMovement],
  tags: ["autodocs"],
  parameters,
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

export const Default: StoryFn<CardMovementProps> = (args) => (
  <CardMovement {...args} />
);
Default.args = {
  movementType: EMovementType.PURCHASE,
  description:
    "Pago Contab. Descuentos de nomina mes FEB/21 Cta.Cobro 41-241000098 Nomina: 30 - Emp: FONDO DE EMPLEADOS DE LA CAJA DE COMPENSACION FAMILIAR DEL VALLE DEL CAUCA",
  totalValue: 500000,
  reference: "CT1100428",
  date: new Date("21/Feb/2024 11:20 am"),
  withExpandingIcon: true
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<CardMovementProps> = (args) => (
  <ThemeProvider theme={theme}>
    <CardMovement {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
