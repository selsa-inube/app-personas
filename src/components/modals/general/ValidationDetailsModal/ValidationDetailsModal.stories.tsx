import { Button } from "@design/input/Button";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { ValidationDetailsModal, ValidationDetailsModalProps } from ".";
import { props } from "./props";

const story = {
  title: "components/modals/general/ValidationDetailsModal",
  component: [ValidationDetailsModal],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

const Template: StoryFn<ValidationDetailsModalProps & { theme?: boolean }> = (
  args,
) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleModal}>Show ValidationDetailsModal</Button>
      {showModal &&
        (args.theme ? (
          <ThemeProvider theme={themes["fondecom"]}>
            <ValidationDetailsModal {...args} onCloseModal={handleModal} />
          </ThemeProvider>
        ) : (
          <ValidationDetailsModal {...args} onCloseModal={handleModal} />
        ))}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "modals",
  label: "Title",
  description: "Description",
};

export const Themed = Template.bind({});
Themed.args = {
  ...Default.args,
  theme: true,
};

export default story;
