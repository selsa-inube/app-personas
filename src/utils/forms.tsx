import { Select } from "@design/input/Select";
import { TextField } from "@design/input/TextField";
import { Textarea } from "@design/input/Textarea";
import { IFormField, IFormStructure } from "@ptypes/forms.types";
import { FormikValues } from "formik";
import * as Yup from "yup";

const generateBasicForm = (fields: IFormField[], formik: FormikValues) => {
  const validations: Yup.StringSchema<string, Yup.AnyObject, undefined, "">[] =
    [];

  fields.forEach((field) => {
    if (field.validation) {
      validations.push(field.validation);
    }
  });

  /* const yupObject = Yup.object({
    ...validations,
  }); */

  const renderFields: React.JSX.Element[] = [];

  for (let field of fields) {
    switch (field.type) {
      case "select":
        renderFields.push(
          <Select
            name={field.name}
            id={field.name}
            label={field.label}
            value={field.value}
            size="compact"
            options={field.options}
            handleChange={field.handleChange}
            handleBlur={field.handleBlur}
            state={field.state}
            errorMessage={field.errorMessage}
            isFullWidth
          />
        );
        break;
      case "text":
        renderFields.push(
          <TextField
            name={field.name}
            id={field.name}
            label={field.label}
            placeholder={field.placeholder}
            size="compact"
            type="number"
            value={field.value}
            handleBlur={field.handleBlur}
            handleChange={field.handleChange}
            validMessage={field.validMessage}
            isFullWidth={field.isFullWidth}
          />
        );
        break;
      case "textarea":
        renderFields.push(
          <Textarea
            name={field.name}
            id={field.name}
            label={field.label}
            placeholder={field.placeholder}
            maxLength={150}
            value={field.value}
            handleBlur={field.handleBlur}
            handleChange={field.handleChange}
            handleFocus={formik.isFocused}
            state={field.state}
            errorMessage={field.errorMessage}
            isFullWidth
          />
        );
        break;
    }
  }

  return {
    /* yupObject, */
    renderFields,
  };
};

const generateDynamicForm = (form: IFormStructure, formik: FormikValues) => {
  const listenFields = Object.keys(form);

  const fields: IFormField[] = [];

  /* listenFields.forEach((field) => {
    if (field === formik.values.disbursementType) {
      form[field].forEach((field) => {
        fields.push(field);
      });
    }
  }); */

  return generateBasicForm(fields, formik);
};

export { generateBasicForm, generateDynamicForm };
