import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { BeneficiariesFormUI } from "./interface";
import { IBeneficiariesEntry } from "./types";

interface BeneficiariesFormProps {
  initialValues: IBeneficiariesEntry;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IBeneficiariesEntry) => void;
  loading?: boolean;
}

const BeneficiariesForm = forwardRef(function BeneficiariesForm(
  props: BeneficiariesFormProps,
  ref: React.Ref<FormikProps<IBeneficiariesEntry>>,
) {
  const { initialValues, onFormValid, onSubmit, loading } = props;
  const [percentage, setPercentage] = useState(0);

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);

    const updatedValues = {
      ...formik.values,
      [event.target.name]: event.target.value,
    };

    let total = 0;
    for (const key in updatedValues) {
      total += Number(updatedValues[key]);
    }
    setPercentage(total);

    onFormValid(!(total > 100));
  };

  return (
    <BeneficiariesFormUI
      loading={loading}
      formik={formik}
      percentage={percentage}
      customHandleChange={customHandleChange}
    />
  );
});

export { BeneficiariesForm };
export type { BeneficiariesFormProps };
