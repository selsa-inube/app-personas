import { ThemeProvider } from "styled-components";
import { ValidationCard } from ".";

import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { IValidation } from "src/model/entity/service";
import { props } from "./props";

const story = {
  title: "components/cards/ValidationCard",
  components: [ValidationCard],
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
  ...themes["fondecom"],
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
