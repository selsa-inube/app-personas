import { FormikProps, useFormik } from "formik";
import { forwardRef, useImperativeHandle } from "react";
import { BeneficiariesUIForm } from "./interface";
import { IBeneficiariesEntry } from "./types";

interface BeneficiariesFormProps {
  initialValues: IBeneficiariesEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const BeneficiariesForm = forwardRef(function BeneficiariesForm(
  props: BeneficiariesFormProps,
  ref: React.Ref<FormikProps<IBeneficiariesEntry>>,
) {
  const { initialValues } = props;

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  const handleCheckBeneficiary = (id: string) => {
    const selectedBeneficiary = formik.values.beneficiaries.find(
      (beneficiary) => beneficiary.identificationNumber === id,
    );

    if (selectedBeneficiary) {
      const selectedBeneficiaries = formik.values.beneficiaries.map((beneficiary) =>
        beneficiary.identificationNumber === id
          ? { ...beneficiary, selected: !beneficiary.selected }
          : beneficiary,
      );

      formik.setValues({ beneficiaries: selectedBeneficiaries });
    }
  };

  return (
    <BeneficiariesUIForm
      formik={formik}
      onCheckBeneficiary={handleCheckBeneficiary}
    />
  );
});

export { BeneficiariesForm };
export type { BeneficiariesFormProps };
