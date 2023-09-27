import { ThemeProvider } from "styled-components";
import { props, parameters } from "./props";
import { themes } from "@mocks/design/themes";
import { Assisted, AssistedProps } from ".";
import { StoryFn } from "@storybook/react";
import { useState } from "react";
import { action } from "@storybook/addon-actions";

const stepsMock = [
  {
    id: 1,
    name: "Información general",
    description: "Description Información general",
  },

  {
    id: 2,
    name: "Ramas",
    description: "Description Ramas",
  },

  {
    id: 3,
    name: "Proyectos",
    description: "Description Proyectos",
  },

  {
    id: 4,
    name: "Unidades de ayuda",
    description: "Description Unidades de ayuda",
  },

  {
    id: 5,
    name: "Nómina",
    description: "Description Nómina",
  },

  {
    id: 6,
    name: "Verificación",
    description: "Description Verificación",
  },
];

const story = {
  title: "design/feedback/Assisted",
  components: [Assisted],
  tags: ["autodocs"],
  parameters,
  argTypes: {
    ...props,
  },
};

const handleStepChangeAction = action(`Step changed to`);

export const Default: StoryFn<AssistedProps> = (args) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    handleStepChangeAction(step);
  };

  return (
    <Assisted
      {...args}
      handleStepChange={handleStepChange}
      currentStep={currentStep}
    />
  );
};

export const Themed: StoryFn<AssistedProps> = (args) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    handleStepChangeAction(step);
  };

  return (
    <ThemeProvider theme={theme}>
      <Assisted
        {...args}
        handleStepChange={handleStepChange}
        currentStep={currentStep}
      />
    </ThemeProvider>
  );
};

const theme = {
  ...themes["fondecom"],
};

Default.args = {
  steps: stepsMock,
  handleFinishAssisted: action("Assisted finished"),
};

Themed.args = {
  ...Default.args,
};

export default story;
