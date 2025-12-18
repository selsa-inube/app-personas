import { ThemeProvider } from "styled-components";
import { ValidationCard } from ".";

import { themesMock } from "@mocks/design/themes";
import type { Decorator } from "@storybook/react-vite";
import { StoryFn } from "@storybook/react-vite";
import { BrowserRouter } from "react-router";
import { IValidation } from "src/model/entity/service";
import { props } from "./props";

const decorators: Decorator[] = [
  (Story) => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  ),
];

const story = {
  title: "components/cards/ValidationCard",
  components: [ValidationCard],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  decorators,
};

export const Default: StoryFn<IValidation> = (args) => (
  <ValidationCard {...args} />
);
Default.args = {
  id: "1",
  label: "Antigüedad mínima como asociado",
  failDetails:
    "El asociado debe contar con una antigüedad mínima de 6 meses para solicitar el auxilio.",
  value: "fail",
};

const theme = {
  ...themesMock.prosel,
};

export const Themed: StoryFn<IValidation> = (args) => (
  <ThemeProvider theme={theme}>
    <ValidationCard {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
