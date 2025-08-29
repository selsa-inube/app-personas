import { ThemeProvider } from "styled-components";
import { AidCard, AidCardProps } from ".";

import { themesMock } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react-vite";
import { BrowserRouter } from "react-router-dom";
import { props } from "./props";

const story = {
  title: "components/cards/AidCard",
  components: [AidCard],
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

export const Default: StoryFn<AidCardProps> = (args) => <AidCard {...args} />;
Default.args = {
  title: "Hospitalización y cirugía",
};

const theme = {
  ...themesMock.prosel,
};

export const Themed: StoryFn<AidCardProps> = (args) => (
  <ThemeProvider theme={theme}>
    <AidCard {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
