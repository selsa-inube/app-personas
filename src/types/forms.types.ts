import { InputSize, ISelectOption } from "@design/input/Select/types";
import * as Yup from "yup";

const inputTypes = ["select", "text", "textarea"];
type InputType = (typeof inputTypes)[number];

interface IFormField {
  name: string;
  type: InputType;
  label: string;
  placeholder: string;
  size: InputSize;
  options?: ISelectOption[];
  value?: string;
  validMessage?: string;
  isFullWidth?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  withCounter?: boolean;
  gridColumn: string;
  validation: Yup.StringSchema<string, Yup.AnyObject, undefined, "">;
}

interface IFormStructure {
  [listenFieldKey: string]: {
    [value: string]: IFormField[];
  };
}

interface IFormOption {
  [key: string]: string[];
}

export type { IFormField, IFormStructure,IFormOption };
