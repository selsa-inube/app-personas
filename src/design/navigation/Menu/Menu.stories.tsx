import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Menu, MenuProps } from ".";
import { MdLogout } from "react-icons/md";
import { props } from "./props";

const story = {
  title: "design/navigation/Menu",
  components: [Menu],
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

export const Default: StoryFn<MenuProps> = (args) => <Menu {...args} />;
Default.args = {
  userName: "Name",
  businessUnit: "Business Unit",
  spacing: "compact",
  sections: [
    {
      links: [
        {
          title: "Logout",
          path: "/",
          iconBefore: <MdLogout />,
        },
      ],
    },
  ],
  avatar: true,
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<MenuProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Menu {...args} />
  </ThemeProvider>
);
Themed.args = { ...Default.args };

export default story;
