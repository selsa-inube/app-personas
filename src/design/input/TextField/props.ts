import { inputSizeTypes, inputStates, inputTypes } from "./types";

const props = {
  label: {
    description: "Controls the text to display in the label",
  },
  name: {
    description: "Controls the name of the textfield",
  },
  id: {
    description: "Corresponds to the identifier of the textfield",
  },
  placeholder: {
    description:
      "Corresponds to the text to display in the textfield whenever it is empty",
  },
  isDisabled: {
    description: "Controls if the label should appear disabled",
  },
  type: {
    control: "select",
    options: inputTypes,
    description: "Corresponds to the type of data obtained by the textfield",
  },
  state: {
    control: "select",
    options: inputStates,
    description: "Controls the state of the textfield",
  },
  inputSize: {
    control: "select",
    options: inputSizeTypes,
    description: "Controls the size of the input",
  },
  value: {
    description: "Corresponds to the value being added within the textfield",
  },
  iconBefore: {
    description:
      "Controls whether an icon is needed at the beginning of the textfield",
  },
  iconAfter: {
    description: "Control and need an icon of the final textfield",
  },
  maxLength: {
    description:
      "defines how many characters maximum are received in the component value",
  },
  minLength: {
    description:
      "defines how many minimum characters the component receives as a value",
  },
  max: {
    description:
      "defines the maximum value that can be inserted (useful for components of type number)",
  },
  min: {
    description:
      "defines the minimum value that can be inserted (useful for components of type number)",
  },
  isRequired: {
    description: "defines if the field is required or not",
  },
  errorMessage: {
    description: "show when the field is validated and there is an error",
  },
  validMessage: {
    description: "show when the field is validated without errors",
  },
  isFullWidth: {
    description: "option to fit field width to its parent width",
  },
  readOnly: {
    description: "option to make the field read only",
  },
  children: {
    description: "Controls the text to display in the label",
  },
  isFocused: {
    description: "Controls if the label should appear focused",
  },
  isInvalid: {
    description: "Controls if the label should appear invalid",
  },
  htmlFor: {
    description: "Controls the identification of the label",
  },
};

export { props };
