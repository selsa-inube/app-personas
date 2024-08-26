import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { RegulationValidationsFormUI } from "./interface";
import { IRegulationValidationsEntry } from "./types";

interface RegulationValidationsFormProps {
  initialValues: IRegulationValidationsEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegulationValidationsForm = forwardRef(function RegulationValidationsForm(
  props: RegulationValidationsFormProps,
  ref: React.Ref<FormikProps<IRegulationValidationsEntry>>,
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
    <RegulationValidationsFormUI
      formik={formik}
      loadingValids={loadingValids}
    />
  );
});

export { RegulationValidationsForm };
export type { RegulationValidationsFormProps };
