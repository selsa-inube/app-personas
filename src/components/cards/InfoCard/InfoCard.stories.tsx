import { ThemeProvider } from "styled-components";
import { props } from "./props";

import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { InfoCard, InfoCardProps } from ".";

const story = {
  title: "components/cards/InfoCard",
  components: [InfoCard],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default: StoryFn<InfoCardProps> = (args) => <InfoCard {...args} />;

Default.args = {
  title: "Solicitud por destinación",
  description: "Sugerido si no conoces nuestro catalogo de productos.",
};

export const Themed: StoryFn<InfoCardProps> = (args) => (
  <ThemeProvider theme={themes["fondecom"]}>
    <InfoCard {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
