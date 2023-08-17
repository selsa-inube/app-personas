import { useState } from "react";
import { Blanket, BlanketProps } from "..";

import { Button } from "@design/input/Button";
import { themes } from "@mocks/design/themes";
import { StoryFn } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { StyledBackdropBlanket } from "./styles";

const story = {
  title: "design/layout/Blanket",
  components: Blanket,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "the Blanket is used when you want to render  a screen lock to interact with a component in the foreground",
      },
    },
  },
  argTypes: {
    children: {
      description:
        "property used to determine if the component is capable of hosting nodes **ReactElement**",
    },
  },
};

const Template: StoryFn<BlanketProps> = (args) => {
  const [showBlanket, setShowBlanket] = useState(false);

  const handleShowBlanket = () => {
    setShowBlanket(true);
  };

  return (
    <>
      <Button handleClick={handleShowBlanket}>Show Blanket</Button>
      {showBlanket && (
        <Blanket {...args}>
          <StyledBackdropBlanket onClick={() => setShowBlanket(false)} />
        </Blanket>
      )}
    </>
  );
};

export const Default = Template.bind({});

const theme = {
  ...themes["fondecom"],
};

export const Themed = Template.bind(
  <ThemeProvider theme={theme}></ThemeProvider>
);

export default story;
