import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle, useState } from "react";
import { BeneficiariesFormUI } from "./interface";
import { IBeneficiariesEntry } from "./types";

interface BeneficiariesFormProps {
  initialValues: IBeneficiariesEntry;
  loading?: boolean;
  withSubmit?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IBeneficiariesEntry) => void;
}

const BeneficiariesForm = forwardRef(function BeneficiariesForm(
  props: BeneficiariesFormProps,
  ref: React.Ref<FormikProps<IBeneficiariesEntry>>,
) {
  const { initialValues, loading, withSubmit, onFormValid, onSubmit } = props;
  const [percentage, setPercentage] = useState(
    Object.values(initialValues).reduce((acc, curr) => acc + Number(curr), 0),
  );

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

    const total = Object.values(updatedValues).reduce(
      (acc, curr) => acc + Number(curr),
      0,
    );
    setPercentage(total);

    onFormValid && onFormValid(!(total > 100));
  };

  return (
    <BeneficiariesFormUI
      loading={loading}
      formik={formik}
      percentage={percentage}
      withSubmit={withSubmit}
      customHandleChange={customHandleChange}
    />
  );
});

export { BeneficiariesForm };
export type { BeneficiariesFormProps };
