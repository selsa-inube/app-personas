import { InputSize, ISelectOption } from "@design/input/Select/types";
import * as Yup from "yup";

interface IFormField {
  name: string;
  type: "select" | "text" | "textarea";
  label: string;
  placeholder: string;
  size: InputSize;
  options?: ISelectOption[];
  value: string;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleBlur: (event: React.FocusEvent<HTMLElement, Element>) => void;
  state: string;
  errorMessage: string;
  validMessage?: string;
  isFullWidth?: boolean;
  validation?: Yup.StringSchema<string, Yup.AnyObject, undefined, "">;
}

interface IFormStructure {
  [key: string]: {
    [key: string]: IFormField[];
  };
}

export type { IFormField, IFormStructure };
