import { Button } from "@design/input/Button";
import { Product } from "@components/cards/Product";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { CommitmentsSavingModal, CommitmentsSavingModalProps } from ".";
import { props, parameters } from "./props";
import { MdOutlineTimer } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { currencyFormat } from "src/utils/formats";

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
  products: (
    <Product
      title="Ahorro programado"
      description="2 - 23110125"
      icon={<MdOutlineTimer />}
      attributes={[
        { id: "1", label: "Valor a pagar", value: currencyFormat(150000) },
      ]}
    />
  ),
};

export const Themed = Template.bind({});
Themed.args = {
  ...Default.args,
  theme: true,
};

export default story;
