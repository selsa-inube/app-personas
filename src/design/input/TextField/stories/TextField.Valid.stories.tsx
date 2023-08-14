import { Stack } from "@design/layout/Stack";
import { TextField, TextFieldProps } from "..";
import { props } from "../props";
import { inputSize } from "../types";
import { TextFieldController } from "./TextfieldController";

const story = {
  title: "inputs/TextField",
  components: [TextField],
  argTypes: props,
};

const TextFieldComponent = (args: TextFieldProps) => {
  return (
    <Stack justifyContent="space-evenly">
      {inputSize.map((size) => (
        <TextFieldController {...args} key={size} size={size} state="valid" />
      ))}
    </Stack>
  );
};

const Valid = {
  args: {
    label: "Username",
    name: "Username",
    id: "Username",
    placeholder: "Write your full name",
    value: "LGARZON",
    isDisabled: false,
    errorMessage: "Please enter only letters in this field",
    validMessage: "Field validation is successful",
    isRequired: true,
    state: "pending",
    type: "text",
    size: "wide",
  },
  render: (args: TextFieldProps) => <TextFieldComponent {...args} />,
};

export default story;

export { Valid };
