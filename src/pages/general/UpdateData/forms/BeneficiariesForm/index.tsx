import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
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

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: onSubmit || (() => true),
  });

  useImperativeHandle(ref, () => formik);

  const customHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBeneficiaries = formik.values.beneficiaries.map((beneficiary) => {
      return beneficiary.id === event.target.name
        ? { ...beneficiary, percentage: Number(event.target.value) }
        : beneficiary;
    });

    formik.setFieldValue("beneficiaries", newBeneficiaries);

    const total = newBeneficiaries.reduce(
      (acc, curr) => acc + Number(curr.percentage || 0),
      0,
    );

    formik.setFieldValue("totalPercentage", total);

    onFormValid && onFormValid(!(total > 100));
  };

  return (
    <BeneficiariesFormUI
      loading={loading}
      formik={formik}
      withSubmit={withSubmit}
      customHandleChange={customHandleChange}
    />
  );
});

export { BeneficiariesForm };
export type { BeneficiariesFormProps };
