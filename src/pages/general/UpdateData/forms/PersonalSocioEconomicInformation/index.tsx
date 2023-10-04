import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { IPersonalSocioEconomicInformationEntry } from "./types";
import { PersonalSocioEconomicInformationFormUI } from "./interface";

interface PersonalSocioEconomicInformationFormProps {
  initialValues: IPersonalSocioEconomicInformationEntry;
  handleSubmit?: (values: IPersonalSocioEconomicInformationEntry) => void;
  loading?: boolean;
}

const PersonalSocioEconomicInformationForm = forwardRef(
  function PersonalSocioEconomicInformationForm(
    props: PersonalSocioEconomicInformationFormProps,
    ref: React.Ref<FormikProps<IPersonalSocioEconomicInformationEntry>>
  ) {
    const { initialValues, handleSubmit, loading } = props;

    const formik = useFormik({
        initialValues,
        validateOnChange: false,
        onSubmit: handleSubmit || (() => {}),
      });

      useImperativeHandle(ref, () => formik);

      return <PersonalSocioEconomicInformationFormUI loading={loading} formik={formik} />;
  }
);

export { PersonalSocioEconomicInformationForm };
export type { PersonalSocioEconomicInformationFormProps };
