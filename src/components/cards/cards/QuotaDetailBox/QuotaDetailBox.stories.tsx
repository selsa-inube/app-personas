import { ThemeProvider } from "styled-components";
import { QuotaDetailBox, QuotaDetailBoxProps } from ".";

import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { props } from "./props";

const story = {
  title: "components/cards/QuotaDetailBox",
  components: [QuotaDetailBox],
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

export const Default: StoryFn<QuotaDetailBoxProps> = (args) => (
  <QuotaDetailBox {...args} />
);
Default.args = {
  title: "Pago mínimo",
  paymentItems: [
    {
      id: "1",
      label: "Abono a capital",
      value: 100000,
    },
    {
      id: "2",
      label: "Interés corriente",
      value: 150000,
    },
    {
      id: "3",
      label: "Interés de mora",
      value: 0,
    },
    {
      id: "4",
      label: "Cuota de manejo",
      value: 7500,
    },
    {
      id: "5",
      label: "Comisiones",
      value: 20000,
    },
  ],
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<QuotaDetailBoxProps> = (args) => (
  <ThemeProvider theme={theme}>
    <QuotaDetailBox {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
