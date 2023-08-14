import { TextField, TextFieldProps } from "..";
import { TextFieldController } from "./TextfieldController";

import { props } from "../props";
import { Stack } from "@design/layout/Stack";

const story = {
  title: "inputs/TextField",
  components: [TextField],
  argTypes: props,
};

const RequiredComponent = (args: TextFieldProps) => {
  return (
    <Stack justifyContent="space-evenly">
      <TextFieldController {...args} />
      <TextFieldController {...args} size="compact" state="invalid" />
    </Stack>
  );
};

const Required = (args: TextFieldProps) => (
  <RequiredComponent {...args} isRequired={true} />
);
Required.args = {
  label: "Username",
  name: "Username",
  id: "Username",
  placeholder: "Write your full name",
  isDisabled: false,
  type: "text",
  state: "pending",
  size: "wide",
  maxLength: 20,
  minLength: 1,
  max: 10,
  min: 1,
  isFullWidth: false,
  errorMessage: "This field can not be blank",
  validMessage: "Field validation is successful",
};

export default story;

export { Required };
