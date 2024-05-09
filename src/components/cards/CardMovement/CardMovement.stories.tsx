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
  description: "GERÓNIMO MARTINS SAS",
  totalValue: 500000,
  date: new Date("21/Feb/2024 11:20 am"),
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
