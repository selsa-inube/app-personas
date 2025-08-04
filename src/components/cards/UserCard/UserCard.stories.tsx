import { ThemeProvider } from "styled-components";
import { UserCard, UserCardProps } from ".";

import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { props } from "./props";
import { themesMock } from "@mocks/design/themes";

const story = {
  title: "components/cards/UserCard",
  components: [UserCard],
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
