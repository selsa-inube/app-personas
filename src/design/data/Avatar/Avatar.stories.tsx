import { ThemeProvider } from "styled-components";
import { Avatar } from ".";

import { fondecom } from "@mocks/theme";

const story = {
  title: "design/data/Avatar",
  components: [Avatar],
};

export const Default = () => <Avatar />;

const theme = {
  ...fondecom,
};

export const Themed = () => {
  return (
    <ThemeProvider theme={theme}>
      <Avatar />
    </ThemeProvider>
  );
};

export default story;
