import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { MdAndroid } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MenuItem, MenuItemProps } from ".";
import { props } from "./props";

const story = {
  title: "design/navigation/Menu/MenuItem",
  components: [MenuItem],
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

export const Default: StoryFn<MenuItemProps> = (args) => <MenuItem {...args} />;
Default.args = {
  title: "Title",
  description: "Description",
  iconBefore: <MdAndroid />,
  spacing: "wide",

  disabled: false,
};

export const IconAfter: StoryFn<MenuItemProps> = (args) => (
  <MenuItem {...args} />
);
IconAfter.args = {
  title: "Title",
  description: "Description",
  iconAfter: <MdAndroid />,
  spacing: "wide",
  disabled: false,
};

export const Disabled: StoryFn<MenuItemProps> = (args) => (
  <MenuItem {...args} />
);
Disabled.args = {
  ...Default.args,
  disabled: true,
};

const theme = {
  ...themes[enviroment.BUSINESS_UNIT],
};

export const Themed: StoryFn<MenuItemProps> = (args) => (
  <ThemeProvider theme={theme}>
    <MenuItem {...args} />
  </ThemeProvider>
);
Themed.args = { ...Default.args };

export default story;
