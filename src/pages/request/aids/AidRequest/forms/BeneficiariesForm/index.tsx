import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useParams } from "react-router";
import { AppContext } from "src/context/app";
import { captureNewError } from "src/services/errors/handleErrors";
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
  const { aid_id } = useParams();
  const { accessToken } = useAuth();
  const { user, serviceDomains } = useContext(AppContext);
  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: async () => true,
  });
  const [loading, setLoading] = useState(true);

  useImperativeHandle(ref, () => formik);

  useEffect(() => {
    const isFormValid = formik.values.beneficiaries.some(
      (beneficiary) => beneficiary.selected,
    );
    onFormValid?.(isFormValid);
  }, [formik.values.beneficiaries]);


  const handleFetchBeneficiaries = async () => {
    if (
      !aid_id ||
      !accessToken ||
      formik.values.beneficiaries.length > 0 ||
      !user.identification
    ) {
      setLoading(false);
      return;
    }

    getBeneficiariesForAid(aid_id, user.identification, accessToken)
      .then((beneficiaries) => {
        formik.setFieldValue("beneficiaries", beneficiaries);
      })
      .catch((error) => {
        captureNewError(
          error,
          {
            inFunction: "handleFetchBeneficiaries",
            action: "getBeneficiariesForAid",
            screen: "BeneficiariesForm",
            file: "src/pages/request/aids/AidRequest/forms/BeneficiariesForm/index.tsx",
          },
          { feature: "request-aid" },
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleFetchBeneficiaries();
  }, [aid_id, accessToken]);

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
      loading={loading}
      serviceDomains={serviceDomains}
      onSelectBeneficiary={handleSelectBeneficiary}
    />
  );
});

export { BeneficiariesForm };
export type { BeneficiariesFormProps };
