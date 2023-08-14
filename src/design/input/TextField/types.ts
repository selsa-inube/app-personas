const inputTypes = [
  "text",
  "email",
  "number",
  "password",
  "search",
  "tel",
] as const;
type InputTypesType = (typeof inputTypes)[number];

const inputSize = ["wide", "compact"] as const;
type InputSizeType = (typeof inputSize)[number];

const inputState = ["valid", "invalid", "pending"] as const;
type InputStateType = (typeof inputState)[number];

interface IInputMessage {
  state?: InputStateType;
  isDisabled?: boolean;
  errorMessage?: string;
  validMessage?: string;
}

export { inputSize, inputState, inputTypes };
export type { IInputMessage, InputSizeType, InputStateType, InputTypesType };
