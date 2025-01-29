import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MenuHeading, MenuHeadingProps } from ".";
import { props } from "./props";

const story = {
  title: "design/navigation/Menu/MenuHeading",
  components: [MenuHeading],
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

export const Default: StoryFn<MenuHeadingProps> = (args) => (
  <MenuHeading {...args} />
);
Default.args = {
  title: "Title",
};

const theme = {
  ...themes[enviroment.BUSINESS_UNIT],
};

export const Themed: StoryFn<MenuHeadingProps> = (args) => (
  <ThemeProvider theme={theme}>
    <MenuHeading {...args} />
  </ThemeProvider>
);
Themed.args = { ...Default.args };

export default story;
