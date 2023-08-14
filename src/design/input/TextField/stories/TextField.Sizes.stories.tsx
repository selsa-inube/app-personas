import { TextField, TextFieldProps } from "..";
import { TextFieldController } from "./TextfieldController";

import { Stack } from "@design/layout/Stack";
import { props } from "../props";
import { inputSize } from "../types";

const story = {
  title: "inputs/TextField",
  components: [TextField],
  argTypes: props,
};

const TextFieldComponent = (args: TextFieldProps) => {
  return (
    <Stack justifyContent="space-evenly">
      {inputSize.map((size) => (
        <TextFieldController {...args} key={size} size={size} />
      ))}
    </Stack>
  );
};

const Size = {
  args: {
    label: "Username",
    name: "Username",
    id: "Username",
    isDisabled: false,
    placeholder: "Write your full name",
    value: "",
    state: "pending",
    type: "text",
    maxLength: 10,
    minLength: 1,
    errorMessage: "Please enter only letters in this field",
    validMessage: "The field has been successfully validated",
    isFullWidth: false,
    isRequired: false,
    readOnly: false,
  },
  render: (args: TextFieldProps) => <TextFieldComponent {...args} />,
};

export default story;

export { Size };
