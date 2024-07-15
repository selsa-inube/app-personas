const inputSizeTypes = ["wide", "compact"] as const;
type InputSize = (typeof inputSizeTypes)[number];

const inputStates = ["valid", "invalid", "pending"] as const;
type InputState = (typeof inputStates)[number];

interface IDateFieldMessage {
  state?: InputState;
  isDisabled?: boolean;
  errorMessage?: string;
  validMessage?: string;
}

export { inputSizeTypes, inputStates };
export type { IDateFieldMessage, InputSize, InputState };
