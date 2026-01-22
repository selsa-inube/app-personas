import { ThemeProvider } from "styled-components";
import { CollapseCard, CollapseCardProps } from ".";
import { MdOutlineSavings } from "react-icons/md";
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
  title: "components/cards/CollapseCard",
  components: [CollapseCard],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  decorators,
};

export const Default: StoryFn<CollapseCardProps> = (args) => <CollapseCard {...args} />;
Default.args = {
  title: "Ahorros",
  subtitle: "Consulta tus cuentas",
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

export const Themed: StoryFn<CollapseCardProps> = (args) => (
  <ThemeProvider theme={theme}>
    <CollapseCard {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
