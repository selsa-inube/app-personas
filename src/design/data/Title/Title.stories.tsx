import { ThemeProvider } from "styled-components";
import { Title, TitleProps } from ".";

import { themesMock } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react-vite";
import { MdArrowBack } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { props } from "./props";

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
