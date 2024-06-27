import { StoryFn } from "@storybook/react";
import { DestinationCard, DestinationCardProps } from ".";
import { props } from "./props";

import { fondecom } from "@mocks/design/themes/fondecom";
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
  maxRate: 10,
  maxAmount: 15000000,
  maxDeadline: 24,
};

const theme = {
  ...fondecom,
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
