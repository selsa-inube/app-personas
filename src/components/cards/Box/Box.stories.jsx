import { ThemeProvider } from "styled-components";
import { Box } from ".";

import { MdAdd, MdOutlineSavings } from "react-icons/md";

import { fondecom } from "../../../mocks/theme";
import { Text } from "../../../design/data/Text";

const story = {
  title: "components/cards/Box",
  components: [Box],
  tags: ["autodocs"],
};

export const Default = (args) => <Box {...args} />;
Default.args = {
  icon: <MdOutlineSavings />,
  title: "Ahorros",
  subtitle: "Resumen de tus productos de ahorro",
  children: (
    <Text type="body" size="medium" appearance="gray">
      Place your content here
    </Text>
  ),
  button: {
    label: "Solicitar ahorro",
    icon: <MdAdd />,
  },
  collapsing: {
    allow: true,
    start: true,
  },
};

const theme = {
  ...fondecom,
};

export const Themed = (args) => (
  <ThemeProvider theme={theme}>
    <Box {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
