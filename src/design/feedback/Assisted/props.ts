const parameters = {
  docs: {
    description: {
      component:
        "The assited displays the steps and progress through a journey. Use the assited to guide users through steps or actions across multiple screens, in order to complete a task.",
    },
  },
};

const props = {
  steps: {
    description:
      "are the array of steps that the component will receive to map them",
  },
  currentStep: {
    description:
      "is the current step number that will be received from the parent or interface that is using it",
  },
  stepsFlow: {
    description:
      "is the flow of steps that the component will receive to map them",
  },
  disableNextStep: {
    description: "is an indicator to disable the next step button",
  },
  showButtonsLabels: {
    control: { type: "boolean" },
    description: "Corresponds to if you want to have the text on the assisted buttons",
  },
};

export { parameters, props };
