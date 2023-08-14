import { TextField, TextFieldProps } from "..";
import { TextFieldController } from "./TextfieldController";

import { props } from "../props";

const story = {
  title: "inputs/TextField",
  components: [TextField],
  argTypes: props,
};

const Number = (args: TextFieldProps) => <TextFieldController {...args} />;
Number.args = {
  label: "Quantity",
  name: "quantity",
  id: "quantity",
  placeholder: "Value",
  type: "number",
  state: "pending",
  isDisabled: false,
  max: 10,
  min: 0,
  isRequired: false,
  size: "wide",
  isFullWidth: false,
};

export default story;

export { Number };
