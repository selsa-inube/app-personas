import { Button } from "@inubekit/inubekit";
import { themes } from "@mocks/design/themes";
import { savingsCommitmentsMock } from "@mocks/products/savings/savingsCommitments.mocks";
import { savingsAccountIcons } from "@pages/admin/savings/SavingsAccount/config/saving";
import { StoryFn } from "@storybook/react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { SavingCommitmentsModal, SavingCommitmentsModalProps } from ".";
import { parameters, props } from "./props";

const story = {
  title: "components/modals/SavingCommitmentsModal",
  component: [SavingCommitmentsModal],
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

const Template: StoryFn<SavingCommitmentsModalProps & { theme?: boolean }> = (
  args,
) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleModal}>SavingCommitmentsModal</Button>
      {showModal &&
        (args.theme ? (
          <ThemeProvider theme={themes["fondecom"]}>
            <SavingCommitmentsModal {...args} onCloseModal={handleModal} />
          </ThemeProvider>
        ) : (
          <SavingCommitmentsModal {...args} onCloseModal={handleModal} />
        ))}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "modals",
  commitments: savingsCommitmentsMock,
  commitmentsIcons: savingsAccountIcons,
};

export const Themed = Template.bind({});
Themed.args = {
  ...Default.args,
  theme: true,
};

export default story;
