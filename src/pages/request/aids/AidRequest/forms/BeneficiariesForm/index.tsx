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
    <BeneficiariesUIForm
      formik={formik}
      onSelectBeneficiary={handleSelectBeneficiary}
    />
  );
});

export { BeneficiariesForm };
export type { BeneficiariesFormProps };
