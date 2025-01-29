import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { EMovementType } from "src/model/entity/product";
import { ThemeProvider } from "styled-components";
import { RecordCard, RecordCardProps } from ".";
import { parameters, props } from "./props";

const story = {
  title: "components/cards/RecordCard",
  component: [RecordCard],
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

export const Default: StoryFn<RecordCardProps> = (args) => (
  <RecordCard {...args} />
);
Default.args = {
  id: "1",
  type: EMovementType.RECORD,
  description:
    "Pago Contab. Descuentos de nomina mes FEB/21 Cta.Cobro 41-241000098 Nomina: 30",

  value: 578000,
  tag: {
    label: "En progreso",
    appearance: "warning",
  },
  attributes: [
    { id: "paymentDate", label: "Fecha", value: "21/Jun/2024 5:46 pm" },
    {
      id: "paymentMethod",
      label: "Forma de pago",
      value: "Cta ahoro automatica",
    },
    { id: "cus", label: "CUS", value: "0000000115" },
  ],
  withExpandingIcon: true,
  loading: false,
};

const theme = {
  ...themes[enviroment.BUSINESS_UNIT],
};

export const Themed: StoryFn<RecordCardProps> = (args) => (
  <ThemeProvider theme={theme}>
    <RecordCard {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
