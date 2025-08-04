import { ThemeProvider } from "styled-components";
import { Title, TitleProps } from ".";

import { StoryFn } from "@storybook/react";
import { MdArrowBack } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { props } from "./props";
import { themesMock } from "@mocks/design/themes";

const story = {
  title: "design/data/Title",
  components: [Title],
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

export const Default: StoryFn<TitleProps> = (args) => <Title {...args} />;
Default.args = {
  title: "Bienvenido(a), Leonardo",
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
