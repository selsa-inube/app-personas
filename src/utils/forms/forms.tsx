import { TextField } from "@design/input/TextField";
import { Textarea } from "@design/input/Textarea";
import { Select } from "@inubekit/inubekit";
import { IFormField, IFormStructure } from "@ptypes/forms.types";
import { FormikValues } from "formik";
import * as Yup from "yup";
import { StyledInputForm } from "./forms.styles";

const formikHandleChange = (
  name: string,
  value: string,
  formik: FormikValues,
) => {
  formik.setFieldValue(name, value);
};

const isRequired = (
  schema: Yup.ObjectSchema<Yup.AnyObject>,
  fieldName: string,
): boolean => {
  const fieldDescription = schema.describe().fields[fieldName];
  if (!("nullable" in fieldDescription)) return false;
  return !fieldDescription.nullable && !fieldDescription.optional;
};

const getFieldState = (formik: FormikValues, fieldName: string) => {
  if (formik.errors[fieldName]) return "invalid";
  return "valid";
};

const isInvalid = (formik: FormikValues, fieldName: string): boolean => {
  return formik.errors[fieldName] && formik.touched[fieldName];
};

const generateBasicForm = (fields: IFormField[]) => {
  let validationSchema = Yup.object({});

  for (const field of fields) {
    validationSchema = validationSchema.concat(
      Yup.object({ [field.name]: field.validation }),
    );
  }

  return {
    renderFields: fields,
    validationSchema,
  };
};

const generateDynamicForm = (formik: FormikValues, form: IFormStructure) => {
  const listenFields = Object.keys(form);
  const fields: IFormField[] = [];

  listenFields.forEach((listenField) => {
    if (
      form &&
      form[listenField] &&
      formik.values[listenField] &&
      form[listenField][formik.values[listenField]]
    ) {
      fields.push(...form[listenField][formik.values[listenField]]);
    }
  });

  return generateBasicForm(fields);
};

const generateFormFields = (
  renderFields: IFormField[],
  formik: FormikValues,
  customHandleBlur?: (event: React.FocusEvent<HTMLElement, Element>) => void,
  customHandleChange?: (name: string, value: string) => void,
  fullColumns?: boolean,
  disabled?: boolean,
) => {
  return renderFields.map((field) => {
    switch (field.type) {
      case "select":
        return (
          <StyledInputForm
            $gridColumn={fullColumns ? "1 / -1" : field.gridColumn}
            key={field.name}
          >
            <Select
              name={field.name}
              id={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={field.value || formik.values[field.name] || ""}
              size={field.size}
              options={field.options || []}
              onChange={(name, value) =>
                (customHandleChange && customHandleChange(name, value)) ||
                formikHandleChange(name, value, formik)
              }
              invalid={isInvalid(formik, field.name)}
              message={
                typeof formik.errors[field.name] === "string"
                  ? formik.errors[field.name]
                  : undefined
              }
              fullwidth={field.fullwidth}
              disabled={disabled || field.readonly}
              required={field.required}
            />
          </StyledInputForm>
        );
      case "text":
      case "number":
        return (
          <StyledInputForm
            $gridColumn={fullColumns ? "1 / -1" : field.gridColumn}
            key={field.name}
          >
            <TextField
              name={field.name}
              id={field.name}
              label={field.label}
              placeholder={field.placeholder || ""}
              size={field.size}
              type={field.type}
              value={field.value || formik.values[field.name] || ""}
              onBlur={customHandleBlur}
              state={getFieldState(formik, field.name)}
              onChange={formik.handleChange}
              validMessage={field.validMessage}
              message={formik.errors[field.name]}
              fullwidth={field.fullwidth}
              disabled={disabled || field.readonly}
              maxLength={field.maxLength}
              withCounter={field.withCounter}
              required={field.required}
              iconAfter={field.iconAfter}
              iconBefore={field.iconBefore}
            />
          </StyledInputForm>
        );
      case "textarea":
        return (
          <StyledInputForm
            $gridColumn={fullColumns ? "1 / -1" : field.gridColumn}
            key={field.name}
          >
            <Textarea
              name={field.name}
              id={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={field.value || formik.values[field.name] || ""}
              onBlur={customHandleBlur}
              onChange={formik.handleChange}
              state={getFieldState(formik, field.name)}
              validMessage={field.validMessage}
              message={formik.errors[field.name]}
              fullwidth={field.fullwidth}
              disabled={disabled || field.readonly}
              maxLength={field.maxLength}
              withCounter={field.withCounter}
              required={field.required}
            />
          </StyledInputForm>
        );
    }
  });
};

export {
  formikHandleChange,
  generateBasicForm,
  generateDynamicForm,
  generateFormFields,
  getFieldState,
  isInvalid,
  isRequired,
};
