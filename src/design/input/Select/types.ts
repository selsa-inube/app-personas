const inputSizeTypes = ["wide", "compact"];
type InputSize = (typeof inputSizeTypes)[number];

const inputStates = ["valid", "invalid", "pending"];
type InputState = (typeof inputStates)[number];

const inputTypes = ["text", "email", "number", "password", "search", "tel"];
type InputType = (typeof inputTypes)[number];

interface ISelectOption {
  id: string;
  label: string;
  isDisabled: boolean;
  children: string;
}

interface IOption {
  id: string;
  label: string;
}

interface ISelectMessage {
  state?: InputState;
  isDisabled?: boolean;
  errorMessage?: string;
  validMessage?: string;
}

export { inputStates, inputSizeTypes, inputTypes };
export type {
  InputState,
  InputSize,
  ISelectOption,
  IOption,
  ISelectMessage,
  InputType,
};
