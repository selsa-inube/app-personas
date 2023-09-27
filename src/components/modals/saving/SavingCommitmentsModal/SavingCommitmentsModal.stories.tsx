import { Button } from "@design/input/Button";
import { themes } from "@mocks/design/themes";
import { investmentsCommitmentsMock } from "@mocks/products/investments/investmentsCommitments.mocks";
import { investmentIcons } from "@pages/admin/investments/Investment/config/investment";
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
  args
) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button handleClick={handleModal}>SavingCommitmentsModal</Button>
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
  commitments: investmentsCommitmentsMock,
  commitmentsIcons: investmentIcons,
};

export const Themed = Template.bind({});
Themed.args = {
  ...Default.args,
  theme: true,
};

export default story;
