const inputTypes = ["text", "email", "number", "password", "search", "tel"] as const;
type InputType = (typeof inputTypes)[number];

const inputSizeTypes = ["wide", "compact"] as const;
type InputSize = (typeof inputSizeTypes)[number];

const inputStates = ["valid", "invalid", "pending"] as const;
type InputState = (typeof inputStates)[number];

interface ITextFieldMessage {
  state?: InputState;
  isDisabled?: boolean;
  errorMessage?: string;
  validMessage?: string;
}

export { inputSizeTypes, inputStates, inputTypes };
export type { ITextFieldMessage, InputSize, InputState, InputType };
