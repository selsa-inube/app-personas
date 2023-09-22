import { Button } from "@design/input/Button";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { CommitmentsSavingModal, CommitmentsSavingModalProps } from ".";
import { props, parameters } from "./props";
import { BrowserRouter } from "react-router-dom";
import { investmentsCommitmentsMock } from "@mocks/products/investments/investmentsCommitments.mocks";

const story = {
  title: "components/modals/CommitmentsSavingModal",
  component: [CommitmentsSavingModal],
  tags: ["autodocs"],
  parameters,
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

const Template: StoryFn<CommitmentsSavingModalProps & { theme?: boolean }> = (
  args
) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button handleClick={handleModal}>CommitmentsSavingModal</Button>
      {showModal &&
        (args.theme ? (
          <ThemeProvider theme={themes["fondecom"]}>
            <CommitmentsSavingModal {...args} onCloseModal={handleModal} />
          </ThemeProvider>
        ) : (
          <CommitmentsSavingModal {...args} onCloseModal={handleModal} />
        ))}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "modals",
  commitments: investmentsCommitmentsMock,
};

export const Themed = Template.bind({});
Themed.args = {
  ...Default.args,
  theme: true,
};

export default story;
