import { themes } from "@mocks/design/themes";
import { ThemeProvider } from "styled-components";
import { Pagination } from ".";
import { TableProps } from "..";
import { parameters, props } from "../props";
import { PaginationController } from "./PaginationController";

const story = {
  title: "design/data/Table/Pagination",
  component: [Pagination],
  tags: ["autodocs"],
  parameters,
  argTypes: props,
};

export const Default = (args: TableProps) => <PaginationController {...args} />;

Default.args = {
  entries: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ],
  pageLength: 5,
};

const theme = {
  ...themes["fondecom"],
};

export const Themed = (args: TableProps) => (
  <ThemeProvider theme={theme}>
    <PaginationController {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;
