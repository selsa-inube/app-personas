import { useFormik } from "formik";
import { useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalInformationFormUI } from "./interface";
import { IPersonalInformationEntry } from "./types";

const LOADING_TIMEOUT = 1500;

const validationSchema = Yup.object({
  email: validationRules.email.required(validationMessages.required),
  phone: validationRules.phone.required(validationMessages.required),
});

interface PersonalInformationFormProps {
  initialValues: IPersonalInformationEntry;
  handleSubmit: (values: IPersonalInformationEntry) => void;
}

function PersonalInformationForm(props: PersonalInformationFormProps) {
  const { initialValues, handleSubmit } = props;

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: () => {
      setLoading(true);

      setTimeout(() => {
        handleSubmit(formik.values);
        setLoading(false);
      }, LOADING_TIMEOUT);
    },
  });

  const handleSubmitForm = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
      }
      formik.handleSubmit();
    });
  };

  return <PersonalInformationFormUI loading={loading} formik={formik} />;
}

export { PersonalInformationForm };
export type { PersonalInformationFormProps };
