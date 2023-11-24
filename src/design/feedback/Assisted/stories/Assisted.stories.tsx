import { themes } from "@mocks/design/themes";
import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Assisted, AssistedProps } from "..";
import { parameters, props } from "../props";
import { StepsFlowController } from "./StepsFlowController";

const stepsMock = {
  personalInformation: {
    id: 1,
    name: "Información personal",
    description: "Diligencia la información que nos permita identificarte.",
  },
  contactData: {
    id: 2,
    name: "Datos de contacto",
    description: "Diligencia la información que nos permita contactarte.",
  },
  familyGroup: {
    id: 3,
    name: "Grupo familiar",
    description:
      "Diligencia la información que nos permita identificar tu núcleo familiar.",
  },
  verification: {
    id: 4,
    name: "Verificación",
    description:
      "Verifica que la información diligenciada sea correcta y envía la solicitud.",
  },
};

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

const Template: StoryFn<AssistedProps & { theme?: boolean }> = (args) => {
  const [currentStep, setCurrentStep] = useState(
    stepsMock.personalInformation.id
  );

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    handleStepChangeAction(step);
  };

  if (args.theme) {
    return (
      <ThemeProvider theme={theme}>
        <Assisted
          {...args}
          onStepChange={handleStepChange}
          currentStep={currentStep}
        />
      </ThemeProvider>
    );
  }

  return (
    <Assisted
      {...args}
      onStepChange={handleStepChange}
      currentStep={currentStep}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  steps: Object.values(stepsMock),
  onFinishAssisted: action("Assisted finished"),
};

export const ConfigStepsFlow = (args: AssistedProps) => (
  <StepsFlowController {...args} />
);

ConfigStepsFlow.args = {
  ...Default.args,
  stepsFlow: [
    stepsMock.personalInformation.id,
    stepsMock.familyGroup.id,
    stepsMock.verification.id,
  ],
};

const theme = {
  ...themes["fondecom"],
};

export const Themed = Template.bind({});

Themed.args = {
  ...Default.args,
  theme: true,
};

export default story;
