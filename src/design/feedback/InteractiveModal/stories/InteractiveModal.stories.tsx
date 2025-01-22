import { useState } from "react";

import { IAction, IEntry } from "@design/data/Table/types";
import { Button } from "@inubekit/inubekit";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import {
  MdOutlineAssignmentTurnedIn,
  MdOutlineDelete,
  MdOutlineShortcut,
} from "react-icons/md";
import { ThemeProvider } from "styled-components";
import { InteractiveModal, InteractiveModalProps } from "../index";
import { props } from "../props";

const story = {
  title: "design/feedback/InteractiveModal",
  components: [InteractiveModal],
  tags: ["autodocs"],
  argTypes: props,
};

const data: IEntry = {
  id: "10",
  userID: "45645",
  username: "David Leonardo Garzón",
  mail: "lgarzon@gmail.com",
  invitationDate: "11/JUN/2022",
  status: "Sent",
};

const actionsArray: IAction[] = [
  {
    id: "1",
    actionName: "Complete",
    content: () => <MdOutlineAssignmentTurnedIn />,
  },
  {
    id: "2",
    actionName: "Resend",
    content: () => <MdOutlineShortcut />,
  },
  {
    id: "3",
    actionName: "Delete",
    content: () => <MdOutlineDelete />,
  },
];

const labelsArray = [
  {
    id: "userID",
    titleName: "User Id",
    priority: 0,
  },
  {
    id: "username",
    titleName: "Username",
    priority: 1,
  },
  {
    id: "mail",
    titleName: "Mail",
    priority: 2,
  },
  {
    id: "invitationDate",
    titleName: "Invitation Date",
    priority: 3,
  },
  {
    id: "status",
    titleName: "Status",
    priority: 4,
  },
];

const Template: StoryFn<InteractiveModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <InteractiveModal {...args} onCloseModal={() => setShowModal(false)} />
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "modals",
  title: "User Information",
  infoData: data,
  infoTitle: "Información",
  actionsTitle: "Acciones",
  actions: actionsArray,
  labels: labelsArray,
};

const theme = {
  ...themes["fondecom"],
};

export const Themed = Template.bind(
  <ThemeProvider theme={theme}></ThemeProvider>,
);

Themed.args = {
  ...Default.args,
};

export default story;
