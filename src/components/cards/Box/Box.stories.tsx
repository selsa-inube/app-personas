import { ThemeProvider } from "styled-components";
import { Box, BoxProps } from ".";

import { MdAdd, MdOutlineSavings } from "react-icons/md";

import { enviroment } from "@config/enviroment";
import { Text } from "@inubekit/inubekit";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { props } from "./props";

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

export const Default: StoryFn<BoxProps> = (args) => <Box {...args} />;
Default.args = {
  title: "Ahorros",
  subtitle: "Consulta tus cuentas",
  button: {
    label: "Solicitar ahorro",
    path: "/path",
    icon: <MdAdd />,
  },
  collapsing: {
    allow: true,
    start: false,
  },
  children: (
    <Text type="body" size="medium" appearance="gray">
      Place your content here
    </Text>
  ),
  icon: <MdOutlineSavings />,
  loading: false,
  tags: [
    {
      appearance: "danger",
      label: "Tag",
    },
  ],
};

const theme = {
  ...themes[enviroment.BUSINESS_UNIT],
};

export const Themed: StoryFn<BoxProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Box {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
