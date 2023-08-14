import { TextField, TextFieldProps } from "..";
import { TextFieldController } from "./TextfieldController";

import { props } from "../props";

const story = {
  title: "inputs/TextField",
  components: [TextField],
  argTypes: props,
};

const Default = (args: TextFieldProps) => <TextFieldController {...args} />;
Default.args = {
  label: "Username",
  name: "Username",
  id: "Username",
  placeholder: "Write your full name",
  value: "",
  maxLength: 10,
  minLength: 1,
  min: 0,
  max: 0,
  errorMessage: "Please enter only letters in this field",
  validMessage: "The field has been successfully validated",
  size: "wide",
  readOnly: false,
};

export default story;

export { Default };
