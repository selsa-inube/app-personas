import { IFormField, IFormStructure } from "@ptypes/forms.types";
import { FormikValues } from "formik";
import * as Yup from "yup";

const getFieldState = (formik: FormikValues, fieldName: string) => {
  if (!formik.touched[fieldName]) return "pending";
  if (formik.touched[fieldName] && formik.errors[fieldName]) return "invalid";
  return "valid";
};

const generateDynamicForm = (formik: FormikValues, form: IFormStructure) => {
  const listenFields = Object.keys(form);
  const fields: IFormField[] = [];

  let validationSchema = Yup.object({});

  listenFields.forEach((listenField) => {
    if (
      form?.[listenField] &&
      formik.values?.[listenField] &&
      form?.[listenField]?.[formik.values?.[listenField]]
    ) {
      fields.push(...form?.[listenField]?.[formik.values?.[listenField]]);
    }
  });

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

export { generateDynamicForm, getFieldState };
