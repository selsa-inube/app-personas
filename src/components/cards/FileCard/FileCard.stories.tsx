import { ThemeProvider } from "styled-components";
import { FileCard, FileCardProps } from ".";

import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { props } from "./props";

const story = {
  title: "components/cards/FileCard",
  components: [FileCard],
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

export const Default: StoryFn<FileCardProps> = (args) => <FileCard {...args} />;
Default.args = {
  id: "1",
  name: "Factura original.pdf",
  size: 72080,
};

const theme = {
  ...themes["fondecom"],
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
