import { TextField, TextFieldProps } from "..";
import { TextFieldController } from "./TextfieldController";

import { props } from "../props";

const story = {
  title: "inputs/TextField",
  components: [TextField],
  argTypes: props,
};

const Invalid = (args: TextFieldProps) => (
  <TextFieldController {...args} state="invalid" />
);
Invalid.args = {
  label: "Username",
  name: "Username",
  id: "Username",
  value: "L-GARZON",
  placeholder: "Username..",
  isDisabled: false,
  type: "text",
  maxLength: 20,
  minLength: 1,
  isRequired: true,
  errorMessage: "Please enter only letters in this field",
  validMessage: "The field has been successfully validated",
  size: "wide",
  isFullWidth: false,
};

export default story;

export { Invalid };
