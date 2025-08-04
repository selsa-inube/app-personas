import { Table, TableProps } from "../index";

import { StoryFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { parameters, props } from "../props";
import { actionsMock, breakPointsMock, titlesMock } from "./mocks";
import { themesMock } from "@mocks/design/themes";

const story = {
  title: "design/data/Table",
  tags: ["autodocs"],
  component: [Table],
  parameters,
  argTypes: props,
};

export const Default: StoryFn<TableProps> = (args) => <Table {...args} />;
Default.args = {
  portalId: "tableId",
  titles: titlesMock,
  actions: actionsMock,
  entries: [
    {
      id: "11",
      username: "David Leonardo Garzón",
      code: "LGARZON",
      userID: "1256545",
      position: "Credit Analyst",
    },
    {
      id: "12",
      username: "Angie Pinilla",
      code: "APINILLA",
      userID: "789654",
      position: "Adviser",
    },
    {
      id: "13",
      username: "Cristian Rojas",
      code: "CROJAS",
      userID: "258963",
      position: "Credit Analyst",
    },
    {
      id: "14",
      username: "Johan Nova",
      code: "JNOVA",
      userID: "589647",
      position: "Adviser",
    },
  ],
  filter: "",
  pageLength: 10,
  breakpoints: breakPointsMock,
  modalTitle: "Form",
  infoTitle: "Information",
  actionsTitle: "Actions",
};

const theme = {
  ...themesMock.prosel,
};

export const Themed: StoryFn<TableProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Table {...args} />
  </ThemeProvider>
);
Themed.args = {
  ...Default.args,
};

export default story;
