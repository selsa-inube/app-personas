import { ThemeProvider } from "styled-components";
import { Title, TitleProps } from ".";

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

export const Default = (args: TitleProps) => <Title {...args} />;
Default.args = {
  title: "Bienvenido, Leonardo",
  subtitle: "Aquí tienes un resumen de tus productos",
  icon: <MdArrowBack />,
  navigatePage: "/",
};

const theme = {
  ...themes["fondecom"],
};

export const Themed = (args: TitleProps) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Title {...args} />
      </ThemeProvider>
    </BrowserRouter>
  );
};

Themed.args = {
  ...Default.args,
};

export default story;
