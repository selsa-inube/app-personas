import { ThemeProvider } from "styled-components";
import { Title, TitleProps } from ".";

import { themesMock } from "@mocks/design/themes";
import type { Decorator } from "@storybook/react-vite";
import { StoryFn } from "@storybook/react-vite";
import { MdArrowBack } from "react-icons/md";
import { BrowserRouter } from "react-router";
import { props } from "./props";

const decorators: Decorator[] = [
  (Story) => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  ),
];

const story = {
  title: "design/data/Title",
  components: [Title],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  decorators,
};

export const Default: StoryFn<TitleProps> = (args) => <Title {...args} />;
Default.args = {
  title: "Hola, Leonardo",
  subtitle: "Aquí tienes un resumen de tus productos",
  icon: <MdArrowBack />,
  navigatePage: "/",
};

const theme = {
  ...themesMock.prosel,
};

export const Themed: StoryFn<TitleProps> = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <Title {...args} />
    </ThemeProvider>
  );
};

Themed.args = {
  ...Default.args,
};

export default story;
