const inputSizeTypes = ["wide", "compact"];
type InputSize = (typeof inputSizeTypes)[number];

const inputStates = ["valid", "invalid", "pending"];
type InputState = (typeof inputStates)[number];

interface ITextFieldMessage {
  state?: InputState;
  isDisabled?: boolean;
  errorMessage?: string;
  validMessage?: string;
}

export { inputSizeTypes, inputStates };
export type { ITextFieldMessage, InputSize, InputState };
