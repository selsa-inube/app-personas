import { ThemeProvider } from "styled-components";
import { UserCard, UserCardProps } from ".";

import { themesMock } from "@mocks/design/themes";
import type { Decorator } from "@storybook/react-vite";
import { StoryFn } from "@storybook/react-vite";
import { BrowserRouter } from "react-router";
import { action } from "storybook/actions";
import { props } from "./props";

const decorators: Decorator[] = [
  (Story) => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  ),
];

const story = {
  title: "components/cards/UserCard",
  components: [UserCard],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  decorators,
};

export const Default: StoryFn<UserCardProps> = (args) => <UserCard {...args} />;
Default.args = {
  name: "David Leonardo Garzón Páramo",
  identificationType: "C.C",
  identification: "1.013.614.213",
  onClick: action("Redirect to user"),
};

const theme = {
  ...themesMock.prosel,
};

export const Themed: StoryFn<UserCardProps> = (args) => (
  <ThemeProvider theme={theme}>
    <UserCard {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
