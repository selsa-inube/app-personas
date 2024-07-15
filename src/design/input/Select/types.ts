const inputSizeTypes = ["wide", "compact"] as const;
type InputSize = (typeof inputSizeTypes)[number];

const inputStates = ["valid", "invalid", "pending"] as const;
type InputState = (typeof inputStates)[number];

const inputTypes = [
  "text",
  "email",
  "number",
  "password",
  "search",
  "tel",
] as const;
type InputType = (typeof inputTypes)[number];

interface ISelectOption {
  id: string;
  isDisabled?: boolean;
  value: string;
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

export { inputSizeTypes, inputStates, inputTypes };
export type {
  IOption,
  ISelectMessage,
  ISelectOption,
  InputSize,
  InputState,
  InputType,
};
