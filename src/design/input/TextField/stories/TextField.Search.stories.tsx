import { MdSearch } from "react-icons/md";

import { TextField, TextFieldProps } from "..";
import { TextFieldController } from "./TextfieldController";

import { props } from "../props";

const story = {
  title: "inputs/TextField",
  components: [TextField],
  argTypes: props,
};

const Search = (args: TextFieldProps) => (
  <TextFieldController {...args} type="search" state="pending" />
);
Search.args = {
  name: "searchField",
  id: "searchField",
  placeholder: "Search...",
  isDisabled: false,
  iconAfter: <MdSearch />,
  isRequired: false,
  errorMessage: "",
  maxLength: 10,
  minLength: 1,
  max: 10,
  min: 1,
  size: "wide",
  type: "text",
  isFullWidth: false,
};

export default story;

export { Search };
