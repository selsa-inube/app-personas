const parameters = {
  docs: {
    description: {
      component:
        "A text field is an input that allows a user to write or edit text",
    },
  },
};

const props = {
  label: {
    description: "prompts the user what value to enter",
  },
  name: {
    description: "name of the Textarea element",
  },
  id: {
    description:
      "uniquely identifies the **Textarea Component**, it will also allow the **label element** to be connected to the **Textarea element** through the htmlFor of the label",
  },
  placeholder: {
    description: "text to display in the text field whenever it is empty",
  },
  disabled: {
    description:
      "sets the field as to appear disabled, users will not be able to interact with the text field",
    table: {
      defaultValue: { summary: false },
    },
  },
  value: {
    description: "component initial value",
  },
  maxLength: {
    description:
      "defines how many characters maximum are received in the component value",
  },
  withCounter: {
    description:
      "defines if the field will display a counter with the current number of characters",
  },
  lengthThreshold: {
    description:
      "defines the minimum number of characters for the counter to be displayed",
  },
  required: {
    description: "defines if the field is required or not",
    table: {
      defaultValue: { summary: false },
    },
  },
  fullwidth: {
    description: "option to fit field width to its parent width",
    table: {
      defaultValue: { summary: false },
    },
  },
  readOnly: {
    descriptions: "option to make the field read only",
    table: {
      defaultValue: { summary: false },
    },
  },
};

export { parameters, props };
