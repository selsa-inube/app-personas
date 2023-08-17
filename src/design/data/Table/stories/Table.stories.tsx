import { Table, TableProps } from "../index";

import { actionsMock, breakPointsMock, titlesMock } from "./mocks";

import { parameters, props } from "../props";

const story = {
  title: "design/data/Table",
  component: [Table],
  parameters,
  argTypes: props,
};

const Default = (args: TableProps) => <Table {...args} />;
Default.args = {
  id: "tableId",
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

export default story;
export { Default };
