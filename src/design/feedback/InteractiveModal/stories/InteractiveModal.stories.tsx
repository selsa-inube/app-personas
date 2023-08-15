import { useState } from "react";

import { IEntry } from "@design/data/Table/types";
import { Button } from "@design/input/Button";
import { StoryFn } from "@storybook/react";
import { InteractiveModal, InteractiveModalProps } from "../index";
import { props } from "../props";

const story = {
  title: "feedback/InteractiveModal",
  components: [InteractiveModal],
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

export const Default = Template.bind({});
Default.args = {
  portalId: "portals",
  title: "User Information",
  infoData: data,
  infoTitle: "Información",
  actionsTitle: "Acciones",
};

export default story;
