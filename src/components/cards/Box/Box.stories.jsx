import { ThemeProvider } from "styled-components";
import { Box } from ".";

import { MdAdd, MdOutlineSavings } from "react-icons/md";

import { fondecom } from "../../../mocks/theme";
import { Text } from "../../../design/data/Text";
import { props } from "./props";

const story = {
  title: "components/cards/Box",
  components: [Box],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

export const Default = (args) => <Box {...args} />;
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

export const Themed = (args) => (
  <ThemeProvider theme={theme}>
    <Box {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
