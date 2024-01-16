import { Button } from "@design/input/Button";
import { themes } from "@mocks/design/themes";
import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { DecisionModal, DecisionModalProps } from "./index";
import { parameters, props } from "./props";

const story = {
  title: "components/modals/DecisionModal",
  component: [DecisionModal],
  tags: ["autodocs"],
  parameters,
  argTypes: {
    ...props,
  },
};

const Template: StoryFn<DecisionModalProps & { theme?: boolean }> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleModal}>Show Decisión Modal</Button>
      {showModal &&
        (args.theme ? (
          <ThemeProvider theme={themes["fondecom"]}>
            <DecisionModal {...args} onCloseModal={handleModal} />
          </ThemeProvider>
        ) : (
          <DecisionModal {...args} onCloseModal={handleModal} />
        ))}
    </>
  );
};

const closeDecisionModal = () => {
  action("DecisionModal closed")();
};

export const Default = Template.bind({});
Default.args = {
  title: "Text title modal",
  description: "Text description modal",
  actionText: "Text Action select",
  onCloseModal: closeDecisionModal,
  portalId: "modals",
};

export const Themed = Template.bind({});
Themed.args = {
  ...Default.args,
  theme: true,
};

export default story;
