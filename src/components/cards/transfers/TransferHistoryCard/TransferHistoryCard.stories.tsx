import { StoryFn } from "@storybook/react";
import { TransferHistoryCard, TransferHistoryCardProps } from ".";
import { props } from "./props";

import { fondecom } from "@mocks/design/themes/fondecom";
import { ThemeProvider } from "styled-components";

const story = {
  title: "components/cards/transfers/TransferHistoryCard",
  component: [TransferHistoryCard],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<TransferHistoryCardProps> = (args) => (
  <TransferHistoryCard {...args} />
);
Default.args = {
  id: "558907643-1",
  title: "Pago PRE-LIQUIDACIÓN WEB",
  value: 645000,
  date: new Date("30/Mar/2024 11:20 am"),
  destination: "558907643",
  origin: "558907643",
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

export const Themed: StoryFn<TransferHistoryCardProps> = (args) => (
  <ThemeProvider theme={theme}>
    <TransferHistoryCard {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
