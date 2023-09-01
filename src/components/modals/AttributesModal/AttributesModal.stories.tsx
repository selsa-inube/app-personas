import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Button } from "@design/input/Button";
import { StoryFn } from "@storybook/react";
import { IAttribute } from "@ptypes/pages/product.types";
import { AttributeModal, AttributeModalProps } from ".";
import { themes } from "@mocks/design/themes";
import { props } from "./props";

const attributes: IAttribute[] = [
  {
    id: "1",
    label: "Julián David Rodríguez Garzón",
    value: "75%",
  },
  {
    id: "2",
    label: "Leidy Paola Ángel Marín",
    value: "25%",
  },
];

const story = {
  title: "components/modals/AttributeModal",
  component: [AttributeModal],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

const Template: StoryFn<AttributeModalProps & { theme?: boolean }> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button handleClick={handleModal}>Show AttributeModal</Button>
      {showModal &&
        (args.theme ? (
          <ThemeProvider theme={themes["fondecom"]}>
            <AttributeModal {...args} onCloseModal={handleModal} />
          </ThemeProvider>
        ) : (
          <AttributeModal {...args} onCloseModal={handleModal} />
        ))}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  portalId: "modals",
  title: "Title",
  description: "Description",
  attributes: attributes,
};

export const Themed = Template.bind({});
Themed.args = {
  ...Default.args,
  theme: true,
};

export default story;
