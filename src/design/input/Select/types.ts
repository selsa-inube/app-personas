import { RefObject } from "react";
import { SelectProps } from ".";

const inputSizeTypes = ["wide", "compact"];
type InputSize = (typeof inputSizeTypes)[number];

const inputStates = ["valid", "invalid", "pending"];
type InputState = (typeof inputStates)[number];

const inputTypes = ["text", "email", "number", "password", "search", "tel"];
type InputType = (typeof inputTypes)[number];

interface ISelectOptions {
  id: string;
  label: string;
  isDisabled: boolean;
  children: string;
}

interface IOption {
  id: string;
  label: string;
}

interface ISelectInterface extends SelectProps {
  isFocused?: boolean;
  openOptions: boolean;
  ref?: RefObject<{ contains: (e: EventTarget) => EventTarget }>;
  onCloseOptions: () => void;
}

export { inputStates, inputSizeTypes, inputTypes };
export type {
  InputState,
  InputSize,
  ISelectOptions,
  IOption,
  ISelectInterface,
  InputType,
};
