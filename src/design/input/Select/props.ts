import { inputSizeTypes, inputStates, inputTypes } from "./types";

const props = {
  label: {
    description: "Controls the text to display in the label",
  },
  name: {
    description: "Controls the name of the select",
  },
  id: {
    description: "Corresponds to the identifier of the select",
  },
  placeholder: {
    description:
      "Corresponds to the text to display in the textfield whenever it is empty",
  },
  isDisabled: {
    description: "Controls if the select should appear disabled",
  },
  isFullWidth: {
    description: "option to fit field width to its parent width",
  },
  isRequired: {
    description: "defines if the field is required or not",
  },
  type: {
    control: "select",
    options: inputTypes,
    description: "Corresponds to the type of data obtained by the textfield",
  },
  inputSize: {
    control: "select",
    options: inputSizeTypes,
    description: "Controls the size of the select",
  },
  state: {
    control: "select",
    options: inputStates,
    description: "Controls the state of the textfield",
  },
  readOnly: {
    description: "option to make the field read only",
  },
  options: {
    description: "Corresponds to the options provided by the select",
  },
};

export { props };
