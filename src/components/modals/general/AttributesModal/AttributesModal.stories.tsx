import { Button } from "@inubekit/inubekit";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { useState } from "react";
import { IAttribute } from "src/model/entity/product";
import { ThemeProvider } from "styled-components";
import { AttributesModal, AttributesModalProps } from ".";
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
  title: "components/modals/AttributesModal",
  component: [AttributesModal],
  tags: ["autodocs"],
  argTypes: {
    ...props,
  },
};

const Template: StoryFn<AttributesModalProps & { theme?: boolean }> = (
  args,
) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleModal}>Show AttributesModal</Button>
      {showModal &&
        (args.theme ? (
          <ThemeProvider theme={themes["fondecom"]}>
            <AttributesModal {...args} onCloseModal={handleModal} />
          </ThemeProvider>
        ) : (
          <AttributesModal {...args} onCloseModal={handleModal} />
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
