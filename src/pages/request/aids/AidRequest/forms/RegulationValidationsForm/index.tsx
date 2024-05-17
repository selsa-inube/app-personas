import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import * as Yup from "yup";
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
    if (onFormValid) {
      formik.validateForm().then((errors) => {
        onFormValid(Object.keys(errors).length === 0);
      });
    }
  }, [formik.values]);

  return <></>;
});

export { RegulationValidationsForm };
export type { RegulationValidationsFormProps };
