import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { BeneficiariesFormUI } from "./interface";
import { IBeneficiariesEntry } from "./types";

interface BeneficiariesFormProps {
  initialValues: IBeneficiariesEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const BeneficiariesForm = forwardRef(function BeneficiariesForm(
  props: BeneficiariesFormProps,
  ref: React.Ref<FormikProps<IBeneficiariesEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    const isFormValid = formik.values.beneficiaries.some(
      (beneficiary) => beneficiary.selected,
    );

    onFormValid?.(isFormValid);
  }, [formik.values.beneficiaries]);

  const handleSelectBeneficiary = (id: string) => {
    formik.setFieldValue(
      "beneficiaries",
      formik.values.beneficiaries.map((beneficiary) => ({
        ...beneficiary,
        selected: beneficiary.identificationNumber === id,
      })),
    );
  };

  return (
    <BeneficiariesFormUI
      formik={formik}
      onSelectBeneficiary={handleSelectBeneficiary}
    />
  );
});

export { BeneficiariesForm };
export type { BeneficiariesFormProps };
