import { useState } from "react";

import { InteractiveModal, InteractiveModalProps } from "..";

import { Button } from "@design/input/Button";
import { StoryFn } from "@storybook/react";
import { props } from "../props";

const story = {
  title: "feedback/InteractiveModal",
  components: [InteractiveModal],
  argTypes: props,
};

const data = {
  id: 10,
  userID: "45645",
  username: "David Leonardo Garzón",
  mail: "lgarzon@gmail.com",
  invitationDate: "11/JUN/2022",
  status: "Sent",
};

const Template: StoryFn<InteractiveModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button handleClick={() => setShowModal(true)}>Show Modal</Button>
      {showModal && (
        <InteractiveModal {...args} closeModal={() => setShowModal(false)} />
      )}
    </>
  );
};

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

export const WithLabels = Template.bind({});
WithLabels.args = {
  portalId: "portals",
  title: "User Information",
  infoData: data,
  labels: labelsArray,
  infoTitle: "Información",
  actionsTitle: "Acciones",
};

export default story;
