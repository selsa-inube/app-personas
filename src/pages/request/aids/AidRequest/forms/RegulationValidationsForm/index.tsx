import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import * as Yup from "yup";
import { RegulationValidationsFormUI } from "./interface";
import { IRegulationValidationsEntry } from "./types";

const validationSchema = Yup.object().shape({});

interface RegulationValidationsFormProps {
  initialValues: IRegulationValidationsEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegulationValidationsForm = forwardRef(function RegulationValidationsForm(
  props: RegulationValidationsFormProps,
  ref: React.Ref<FormikProps<IRegulationValidationsEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const [dynamicSchema] = useState(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    setTimeout(() => {
      formik.setValues({
        ...formik.values,
        validations: formik.values.validations.map((validation) => ({
          ...validation,
          value: "success",
        })),
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (onFormValid) {
      onFormValid(
        formik.values.validations
          .filter((validation) => validation.isRequired)
          .every((validation) => validation.value === "success"),
      );
    }
  }, [formik.values.validations]);

  return <RegulationValidationsFormUI formik={formik} />;
});

export { RegulationValidationsForm };
export type { RegulationValidationsFormProps };
