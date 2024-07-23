import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import * as Yup from "yup";
import { SystemValidationsFormUI } from "./interface";
import { ISystemValidationsEntry } from "./types";

const validationSchema = Yup.object().shape({});

interface SystemValidationsFormProps {
  initialValues: ISystemValidationsEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SystemValidationsForm = forwardRef(function SystemValidationsForm(
  props: SystemValidationsFormProps,
  ref: React.Ref<FormikProps<ISystemValidationsEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const [dynamicSchema] = useState(validationSchema);

  const [loadingValids, setLoadingValids] = useState(true);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    setLoadingValids(true);
    setTimeout(() => {
      formik.setValues({
        ...formik.values,
        validations: formik.values.validations.map((validation) => ({
          ...validation,
          value: "success",
        })),
      });
      setLoadingValids(false);
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

  return (
    <SystemValidationsFormUI loadingValids={loadingValids} formik={formik} />
  );
});

export { SystemValidationsForm };
export type { SystemValidationsFormProps };
