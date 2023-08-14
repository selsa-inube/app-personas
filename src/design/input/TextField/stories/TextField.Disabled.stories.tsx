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
        <div key={size}>
          <TextFieldController {...args} size={size} isDisabled={true} />
        </div>
      ))}
    </Stack>
  );
};

const Disabled = {
  args: {
    label: "Username",
    name: "Username",
    id: "Username",
    value: "",
    type: "text",
    placeholder: "Write your full name",
    maxLength: 10,
    minLength: 1,
  },
  render: (args: TextFieldProps) => <TextFieldComponent {...args} />,
};

export default story;

export { Disabled };
