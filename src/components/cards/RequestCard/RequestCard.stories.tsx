import { ThemeProvider } from "styled-components";
import { props } from "./props";

import { themes } from "@mocks/design/themes";
import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";
import { RequestCard, RequestCardProps } from ".";

const story = {
  title: "components/cards/RequestCard",
  components: [RequestCard],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<RequestCardProps> = (args) => (
  <RequestCard {...args} />
);

Default.args = {
  title: "Solicitud por destinación",
  descriptions: [
    "Sugerido si no conoces nuestro catalogo de productos.",
    "Sugerido si deseas que el asesor determine cuál es el producto que ofrece las mejores condiciones para tu crédito.",
  ],
  onClick: action("'Solicitar' Clicked"),
};

export const Themed: StoryFn<RequestCardProps> = (args) => (
  <ThemeProvider theme={themes["fondecom"]}>
    <RequestCard {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
