import { useFormik } from "formik";
import { useState } from "react";
import { validationMessages } from "src/validations/validationMessages";
import { validationRules } from "src/validations/validationRules";
import * as Yup from "yup";
import { PersonalInformationFormUI } from "./interface";
import { IPersonalInformationEntry } from "./types";

const LOADING_TIMEOUT = 1500;

const validationSchema = Yup.object({
  expeditionDate: validationRules.expeditionDate.required(
    validationMessages.required
  ),
  birthDate: validationRules.birthDate.required(validationMessages.required),
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

  return <PersonalInformationFormUI loading={loading} formik={formik} />;
}

export { PersonalInformationForm };
export type { PersonalInformationFormProps };
