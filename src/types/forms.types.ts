import { IOption } from "@inubekit/inubekit";
import * as Yup from "yup";

const inputTypes = [
  "select",
  "text",
  "email",
  "number",
  "search",
  "tel",
  "money",
  "textarea",
] as const;
type InputType = (typeof inputTypes)[number];

const inputSizeTypes = ["wide", "compact"] as const;
type InputSize = (typeof inputSizeTypes)[number];

interface IFormField {
  name: string;
  type: InputType;
  label: string;
  placeholder?: string;
  size: InputSize;
  options?: IOption[];
  value?: string;
  validMessage?: string;
  fullwidth?: boolean;
  readonly?: boolean;
  required?: boolean;
  maxLength?: number;
  withCounter?: boolean;
  gridColumn: string;
  validation: Yup.StringSchema<string, Yup.AnyObject, undefined, "">;
  iconAfter?: React.JSX.Element;
  iconBefore?: React.JSX.Element;
}

interface IFormStructure {
  [listenFieldKey: string]: {
    [value: string]: IFormField[];
  };
}

interface IDynamicFormOptions {
  [key: string]: string[];
}

export type { IDynamicFormOptions, IFormField, IFormStructure };
