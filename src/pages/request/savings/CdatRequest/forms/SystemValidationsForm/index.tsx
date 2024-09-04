import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { SystemValidationsFormUI } from "./interface";
import { ISystemValidationsEntry } from "./types";

interface SystemValidationsFormProps {
  initialValues: ISystemValidationsEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SystemValidationsForm = forwardRef(function SystemValidationsForm(
  props: SystemValidationsFormProps,
  ref: React.Ref<FormikProps<ISystemValidationsEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const [loadingValids, setLoadingValids] = useState(false);

  const formik = useFormik({
    initialValues,
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
    <SystemValidationsFormUI formik={formik} loadingValids={loadingValids} />
  );
});

export { SystemValidationsForm };
export type { SystemValidationsFormProps };
