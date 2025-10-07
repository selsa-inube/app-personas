import {
  Emailfield,
  Moneyfield,
  Numberfield,
  Phonefield,
  Searchfield,
  Select,
  Textarea,
  Textfield,
} from "@inubekit/inubekit";
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

const getFieldState = (formik: FormikValues, fieldName: string): "invalid" | "pending" | undefined => {
  if (formik.touched[fieldName]) {
    return formik.errors[fieldName] ? "invalid" : undefined;
  }
  return formik.errors[fieldName] ? "pending" : undefined;
};

const getFieldStatus = (formik: FormikValues, fieldName: string): "invalid" | "pending" => {
  if (formik.errors[fieldName]) return "invalid";
  return "pending";
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

  return { renderFields: fields, validationSchema };
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
  const buildCommonProps = (field: IFormField) => ({
    name: field.name,
    id: field.name,
    label: field.label,
    placeholder: field.placeholder || "",
    size: field.size,
    value: field.value || formik.values[field.name] || "",
    onBlur: customHandleBlur || formik.handleBlur,
    status: getFieldState(formik, field.name),
    onChange: customHandleChange ?
      (name: string, value: string) => customHandleChange(name, value) :
      formik.handleChange,
    message: formik.errors[field.name],
    fullwidth: field.fullwidth,
    disabled: disabled || field.readonly,
    maxLength: field.maxLength,
    required: field.required,
    iconAfter: field.iconAfter,
    iconBefore: field.iconBefore,
  });

  const createInputComponent = (
    Component: React.ElementType, 
    field: IFormField
  ) => {
    const props = buildCommonProps(field);
    return <Component {...props} type={field.type} />;
  };

  const createSelectComponent = (field: IFormField) => {
    const props = buildCommonProps(field);
    return (
      <Select
        {...props}
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
        onFocus={formik.handleFocus}
      />
    );
  };

  const createTextareaComponent = (field: IFormField) => {
    const props = buildCommonProps(field);
    return (
      <Textarea
        {...props}
        onChange={formik.handleChange}
        status={getFieldStatus(formik, field.name)}
      />
    );
  };

  const componentTypeMap = {
    number: (field: IFormField) => createInputComponent(Numberfield, field),
    email: (field: IFormField) => createInputComponent(Emailfield, field),
    tel: (field: IFormField) => <Phonefield {...buildCommonProps(field)} />,
    money: (field: IFormField) => createInputComponent(Moneyfield, field),
    search: (field: IFormField) => createInputComponent(Searchfield, field),
    text: (field: IFormField) => createInputComponent(Textfield, field),
    select: createSelectComponent,
    textarea: createTextareaComponent,
  };

  return renderFields.map((field) => {
    const ComponentFactory = componentTypeMap[field.type as keyof typeof componentTypeMap] 
      || ((field: IFormField) => createInputComponent(Textfield, field));

    return (
      <StyledInputForm
        $gridColumn={fullColumns ? "1 / -1" : field.gridColumn}
        key={field.name}
      >
        {ComponentFactory(field)}
      </StyledInputForm>
    );
  });
};

export {
  formikHandleChange,
  generateBasicForm,
  generateDynamicForm,
  generateFormFields,
  getFieldState,
  getFieldStatus,
  isInvalid,
  isRequired,
};
