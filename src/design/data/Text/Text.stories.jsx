import { ThemeProvider } from "styled-components";
import { Text } from ".";

import { fondecom } from "../../../mocks/theme";

const story = {
  title: "design/data/Text",
  components: [Text],
};

export const Default = () => <Text>This is a paragraph</Text>;

const theme = {
  ...fondecom,
};

export const Themed = () => {
  return (
    <ThemeProvider theme={theme}>
      <Text>This is a paragraph</Text>
    </ThemeProvider>
  );
};

export default story;
