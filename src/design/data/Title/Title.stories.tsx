import { ThemeProvider } from "styled-components";
import { Title, TitleProps } from ".";

import { enviroment } from "@config/enviroment";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
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
  title: "Bienvenido(a), Leonardo",
  subtitle: "Aquí tienes un resumen de tus productos",
  icon: <MdArrowBack />,
  navigatePage: "/",
};

const theme = {
  ...themes[enviroment.BUSINESS_UNIT],
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
