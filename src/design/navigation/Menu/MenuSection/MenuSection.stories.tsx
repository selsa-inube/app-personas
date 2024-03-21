import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MdAndroid } from "react-icons/md";
import { MenuSection, MenuSectionProps } from ".";
import { ISection } from "./types";
import { props } from "./props";

const sections: ISection[] = [
  {
    title: "Heading 1",
    links: [
      {
        title: "Title",
        description: "Description",
        path: "/",
        iconAfter: <MdAndroid />,
      },
      {
        title: "Title",
        description: "Description",
        path: "/",
        iconAfter: <MdAndroid />,
      },
    ],
  },
  {
    title: "Heading 2",
    links: [
      {
        title: "Title",
        description: "Description",
        path: "/",
        iconAfter: <MdAndroid />,
      },
      {
        title: "Title",
        description: "Description",
        path: "/",
        iconAfter: <MdAndroid />,
      },
    ],
  },
];

const story = {
  title: "design/navigation/Menu/MenuSection",
  components: [MenuSection],
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

export const Default: StoryFn<MenuSectionProps> = (args) => (
  <MenuSection {...args} />
);
Default.args = {
  sections: sections,
  divider: false,
  spacing: "wide",
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<MenuSectionProps> = (args) => (
  <ThemeProvider theme={theme}>
    <MenuSection {...args} />
  </ThemeProvider>
);
Themed.args = { ...Default.args };

export default story;
