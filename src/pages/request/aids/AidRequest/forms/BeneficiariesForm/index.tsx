import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "src/context/app";
import { getBeneficiariesForAid } from "src/services/iclient/aids/getBeneficiaries";
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
  const { aid_type } = useParams();
  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);
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

  useEffect(() => {
    if (!aid_type || !accessToken || formik.values.beneficiaries.length > 0)
      return;

    getBeneficiariesForAid(aid_type, user.identification, accessToken).then(
      (beneficiaries) => {
        formik.setFieldValue("beneficiaries", beneficiaries);
      },
    );
  }, [aid_type, accessToken]);

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
