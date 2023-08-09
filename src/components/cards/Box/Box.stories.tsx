import { ThemeProvider } from "styled-components";
import { Box, BoxProps } from ".";

import { MdAdd, MdOutlineSavings } from "react-icons/md";

import { Text } from "@design/data/Text";
import { fondecom } from "@mocks/theme";
import { props } from "./props";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

const story = {
  title: "components/cards/Box",
  components: [Box],
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

export const Default = (args: BoxProps) => <Box {...args} />;
Default.args = {
  title: "Ahorros",
  subtitle: "Consulta tus cuentas",
  button: {
    label: "Solicitar ahorro",
    icon: <MdAdd />,
  },
  collapsing: {
    allow: true,
    start: true,
  },
  children: (
    <Text type="body" size="medium" appearance="gray">
      Place your content here
    </Text>
  ),
  icon: <MdOutlineSavings />,
};

const theme = {
  ...fondecom,
};

export const Themed = (args: BoxProps) => (
  <ThemeProvider theme={theme}>
    <Box {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
