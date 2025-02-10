import { IDisbursementEntry } from "@forms/DisbursementForm/types";
import { useAuth } from "@inube/auth";
import { systemValidationsMock } from "@mocks/products/credits/request.mocks";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { RequestType } from "src/model/entity/request";
import { IBeneficiary } from "src/model/entity/user";
import { getRequirementsForProduct } from "src/services/iclient/productRequest/getRequirements";
import { SystemValidationsFormUI } from "./interface";
import { IMoneySourceValid, ISystemValidationsEntry } from "./types";
import { buildRequestData } from "./utils";

interface SystemValidationsFormProps {
  initialValues: ISystemValidationsEntry;
  disbursementValues: IDisbursementEntry;
  test?: boolean;
  requestType: RequestType;
  beneficiary?: IBeneficiary;
  actionExpiration?: string;
  moneySources?: IMoneySourceValid[];
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SystemValidationsForm = forwardRef(function SystemValidationsForm(
  props: SystemValidationsFormProps,
  ref: React.Ref<FormikProps<ISystemValidationsEntry>>,
) {
  const {
    initialValues,
    disbursementValues,
    test,
    requestType,
    beneficiary,
    actionExpiration,
    moneySources,
    onFormValid,
  } = props;

  const [loadingValids, setLoadingValids] = useState(false);

  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  const getRequirements = () => {
    if (!accessToken || !user.identification) return;
    setLoadingValids(true);

    const requirementsRequest = buildRequestData(
      requestType,
      user,
      formik,
      disbursementValues,
      beneficiary,
      actionExpiration,
      moneySources,
    );

    getRequirementsForProduct(requirementsRequest, accessToken)
      .then((requirements) => {
        if (!requirements) {
          formik.setFieldValue("validations", []);
          return;
        }

        formik.setFieldValue("validations", requirements.validations);

        formik.setFieldValue("documents", requirements.documents);
      })
      .catch(() => {
        formik.setFieldValue("validations", []);

        if (!test) return;
        formik.setFieldValue("validations", systemValidationsMock);
      })
      .finally(() => {
        setLoadingValids(false);
      });
  };

  useEffect(() => {
    /* if (
      JSON.stringify(formik.values.validations) ===
      JSON.stringify(loadingValidations)
    ) { */
    getRequirements();
    /*  } */
  }, []);

  useEffect(() => {
    if (!onFormValid) return;

    onFormValid(
      formik.values.validations
        .filter((validation) => validation.required)
        .every((validation) => validation.value === "success"),
    );
  }, [formik.values.validations]);

  return (
    <SystemValidationsFormUI loadingValids={loadingValids} formik={formik} />
  );
});

export { SystemValidationsForm };
export type { SystemValidationsFormProps };
