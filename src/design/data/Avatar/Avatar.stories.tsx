import { ThemeProvider } from "styled-components";
import { Avatar } from ".";

import { themes } from "@mocks/design/themes";

const story = {
  title: "design/data/Avatar",
  components: [Avatar],
};

export const Default = () => <Avatar />;

const theme = {
  ...themes["fondecom"],
};

export const Themed = () => {
  return (
    <ThemeProvider theme={theme}>
      <Avatar />
    </ThemeProvider>
  );
};

export default story;
