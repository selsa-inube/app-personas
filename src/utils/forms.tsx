import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Textarea } from "@design/input/Textarea";
import { IFormField, IFormStructure } from "@ptypes/forms.types";
import { FormikValues } from "formik";
import * as Yup from "yup";
import { StyledInputForm } from "./forms.styles";

const getFieldState = (formik: FormikValues, fieldName: string) => {
  if (!formik.touched[fieldName]) return "pending";
  if (formik.touched[fieldName] && formik.errors[fieldName]) return "invalid";
  return "valid";
};

const generateBasicForm = (fields: IFormField[]) => {
  let validationSchema = Yup.object({});

  for (let field of fields) {
    validationSchema = validationSchema.concat(
      Yup.object({ [field.name]: field.validation })
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
      form?.[listenField] &&
      formik.values?.[listenField] &&
      form?.[listenField]?.[formik.values?.[listenField]]
    ) {
      fields.push(...form?.[listenField]?.[formik.values?.[listenField]]);
    }
  });

  return generateBasicForm(fields);
};

const generateFormFields = (
  renderFields: IFormField[],
  formik: FormikValues,
  customHandleBlur?: (event: React.FocusEvent<HTMLElement, Element>) => void,
  customHandleChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void,
  fullColumns?: boolean,

  disabled?: boolean
) => {
  return renderFields.map((field) => {
    switch (field.type) {
      case "select":
        return (
          <StyledInputForm
            gridColumn={fullColumns ? "span 2" : field.gridColumn}
            key={field.name}
          >
            <Select
              name={field.name}
              id={field.name}
              label={field.label}
              value={field.value || formik.values[field.name]}
              size={field.size}
              options={field.options}
              onChange={customHandleChange}
              onBlur={customHandleBlur}
              state={getFieldState(formik, field.name)}
              errorMessage={formik.errors[field.name]}
              isFullWidth={field.isFullWidth}
              readOnly={field.readOnly}
              isDisabled={disabled}
            />
          </StyledInputForm>
        );
      case "text":
      case "number":
        return (
          <StyledInputForm
            gridColumn={fullColumns ? "span 2" : field.gridColumn}
            key={field.name}
          >
            <TextField
              name={field.name}
              id={field.name}
              label={field.label}
              placeholder={field.placeholder}
              size={field.size}
              type={field.type}
              value={field.value || formik.values[field.name]}
              onBlur={customHandleBlur}
              state={getFieldState(formik, field.name)}
              onChange={formik.handleChange}
              validMessage={field.validMessage}
              errorMessage={formik.errors[field.name]}
              isFullWidth={field.isFullWidth}
              readOnly={field.readOnly}
              isDisabled={disabled}
              maxLength={field.maxLength}
              withCounter={field.withCounter}
            />
          </StyledInputForm>
        );
      case "textarea":
        return (
          <StyledInputForm
            gridColumn={fullColumns ? "span 2" : field.gridColumn}
            key={field.name}
          >
            <Textarea
              name={field.name}
              id={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={field.value || formik.values[field.name]}
              onBlur={customHandleBlur}
              onChange={formik.handleChange}
              state={getFieldState(formik, field.name)}
              validMessage={field.validMessage}
              errorMessage={formik.errors[field.name]}
              isFullWidth={field.isFullWidth}
              readOnly={field.readOnly}
              maxLength={field.maxLength}
              withCounter={field.withCounter}
              isDisabled={disabled}
            />
          </StyledInputForm>
        );
    }
  });
};

export {
  generateBasicForm,
  generateDynamicForm,
  generateFormFields,
  getFieldState,
};
