import { themesMock } from "@mocks/design/themes";
import { FileDrop, FileDropProps } from ".";

import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

const story = {
  title: "design/input/FileDrop",
  component: [FileDrop],
  tags: ["autodocs"],
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default: StoryFn<FileDropProps> = (args) => <FileDrop {...args} />;
Default.args = {
  onSelectFiles: (files) => {
    alert(`Files selected: ${[...files].map((file) => file.name)}`);
  },
};

const theme = {
  ...themesMock.prosel,
};

export const Themed: StoryFn<FileDropProps> = (args) => (
  <ThemeProvider theme={theme}>
    <FileDrop {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
