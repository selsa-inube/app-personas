import { ThemeProvider } from "styled-components";
import { Box, BoxProps } from ".";

import { MdAdd, MdOutlineSavings } from "react-icons/md";

import { Text } from "@inubekit/inubekit";
import { themesMock } from "@mocks/design/themes";
import type { Decorator } from "@storybook/react-vite";
import { StoryFn } from "@storybook/react-vite";
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
  title: "components/cards/Box",
  components: [Box],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  decorators,
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
  ...themesMock.prosel,
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
