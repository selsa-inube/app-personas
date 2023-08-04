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
};

const Template: StoryFn<TitleProps> = (args) => (
  <BrowserRouter>
    <Title {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  title: "Bienvenido, Leonardo",
  subtitle: "Aquí tienes un resumen de tus productos",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: "Bienvenido, Leonardo",
  subtitle: "Aquí tienes un resumen de tus productos",
  icon: <MdArrowBack />,
  navigatePage: "/",
  parentDisabled: false,
};

export const WithIconDisabled = Template.bind({});
WithIconDisabled.args = {
  title: "Bienvenido, Leonardo",
  subtitle: "Aquí tienes un resumen de tus productos",
  icon: <MdArrowBack />,
  navigatePage: "/",
  parentDisabled: true,
};

const theme = {
  ...themes['fondecom'],
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
