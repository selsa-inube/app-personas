import { StoryFn } from "@storybook/react";
import { DestinationCard, DestinationCardProps } from ".";
import { props } from "./props";

import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";

const story = {
  title: "design/input/DestinationCard",
  component: [DestinationCard],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<DestinationCardProps> = (args) => (
  <DestinationCard {...args} />
);
Default.args = {
  id: "storyDestinationCard",
  title: "Compra de vehículo o moto",
  description: "Compra de vehículo nuevo o usado",
  checked: true,
  attributes: [
    {
      id: "maxRate",
      label: "Tasa máxima",
      value: "28%",
    },
    {
      id: "maxDeadline",
      label: "Plazo máximo",
      value: "84 meses",
    },
    {
      id: "maxAmount",
      label: "Monto máximo",
      value: "$100,000,000",
    },
  ],
};

const theme = {
  ...themes[enviroment.BUSINESS_UNIT],
};

export const Themed: StoryFn<DestinationCardProps> = (args) => (
  <ThemeProvider theme={theme}>
    <DestinationCard {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
