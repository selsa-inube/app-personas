import { Avatar } from ".";
import { ThemeProvider } from "styled-components";

import { fondecom } from "../../../mocks/theme";

const story = {
  title: "design/navigation/Avatar",
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
