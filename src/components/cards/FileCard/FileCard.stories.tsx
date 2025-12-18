import { ThemeProvider } from "styled-components";
import { FileCard, FileCardProps } from ".";

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
  title: "components/cards/FileCard",
  components: [FileCard],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
  decorators,
};

export const Default: StoryFn<FileCardProps> = (args) => <FileCard {...args} />;
Default.args = {
  id: "1",
  name: "Factura original.pdf",
  size: 72080,
};

const theme = {
  ...themesMock.prosel,
};

export const Themed: StoryFn<FileCardProps> = (args) => (
  <ThemeProvider theme={theme}>
    <FileCard {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
