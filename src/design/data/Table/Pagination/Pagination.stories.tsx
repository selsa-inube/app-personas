import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";
import { Pagination } from ".";
import { TableProps } from "..";
import { parameters, props } from "../props";
import { PaginationController } from "./PaginationController";
import { StoryFn } from "@storybook/react";

const story = {
  title: "design/data/Table/Pagination",
  component: [Pagination],
  tags: ["autodocs"],
  parameters,
  argTypes: props,
};

export const Default: StoryFn<TableProps> = (args) => (
  <PaginationController {...args} />
);

Default.args = {
  entries: [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
    { id: "11" },
    { id: "12" },
    { id: "13" },
    { id: "14" },
    { id: "15" },
    { id: "16" },
    { id: "17" },
    { id: "18" },
    { id: "19" },
    { id: "20" },
  ],
  pageLength: 5,
};

const theme = {
  ...themes["fondecom"],
};

export const Themed: StoryFn<TableProps> = (args) => (
  <ThemeProvider theme={theme}>
    <PaginationController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
