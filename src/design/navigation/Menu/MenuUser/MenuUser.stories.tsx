import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MenuUser, MenuUserProps } from ".";
import { props } from "./props";

const story = {
  title: "design/navigation/Menu/MenuUser",
  components: [MenuUser],
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

export const Default: StoryFn<MenuUserProps> = (args) => <MenuUser {...args} />;
Default.args = {
  userName: "Name",
  businessUnit: "Business Unit",
  avatar: true,
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<MenuUserProps> = (args) => (
  <ThemeProvider theme={theme}>
    <MenuUser {...args} />
  </ThemeProvider>
);
Themed.args = { ...Default.args };

export default story;
