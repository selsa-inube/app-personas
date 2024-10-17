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
import { getRequirementsForProduct } from "src/services/iclient/credits/getRequirements";
import { IRequirementRequest } from "src/services/iclient/credits/getRequirements/types";
import { SystemValidationsFormUI } from "./interface";
import { ISystemValidationsEntry } from "./types";
import { loadingValidations } from "./utils";

interface SystemValidationsFormProps {
  initialValues: ISystemValidationsEntry;
  disbursementValues: IDisbursementEntry;
  test?: boolean;
  requestType: RequestType;
  beneficiary?: IBeneficiary;
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
    if (!accessToken) return;

    const requestDate = new Date();

    setLoadingValids(true);
    const requirementsRequest: IRequirementRequest = {
      requestType,
      customerCode: user.identification,
      customerName: `${user.firstName} ${user.secondName} ${user.firstLastName} ${user.secondLastName}`,
      requestDate,
      requestData: {
        productId: formik.values.productId,
        productName: formik.values.productName,
        amount: formik.values.amount,

        destinationId: formik.values.destinationId,
        destinationName: formik.values.destinationName,
        paymentMethod: formik.values.paymentMethod,
        paymentMethodName: formik.values.paymentMethodName,
        deadline: formik.values.deadline,
        rate: formik.values.rate,
        amortizationType: formik.values.amortizationType,
        interestPaymentPeriod: formik.values.periodicity,
        periodicity: formik.values.periodicity,
        quota: formik.values.quota,
        netValue: formik.values.netValue,
        disbursmentMethod: {
          id: disbursementValues.disbursement || "",
          name: disbursementValues.disbursementName || "",
          accountNumber: disbursementValues.accountNumber,
          transferAccountNumber: disbursementValues.writeAccountNumber,
          transferAccountType: disbursementValues.accountType,
          transferBankEntity: disbursementValues.bankEntity,
          firstName: disbursementValues.firstName,
          lastName: disbursementValues.firstLastName,
          gender: disbursementValues.gender,
          genderName: disbursementValues.gender,
          identificationType: disbursementValues.identificationType,
          identification: disbursementValues.identification,
        },

        beneficiary,
      },
    };

    getRequirementsForProduct(requirementsRequest, accessToken)
      .then((requirements) => {
        if (!requirements) return;

        formik.setFieldValue("validations", requirements.validations);

        formik.setFieldValue("documents", requirements.documents);

        setLoadingValids(false);
      })
      .catch(() => {
        if (!test) return;

        formik.setFieldValue("validations", systemValidationsMock);
        setLoadingValids(false);
      });
  };

  useEffect(() => {
    if (
      JSON.stringify(formik.values.validations) ===
      JSON.stringify(loadingValidations)
    ) {
      getRequirements();
    }
  }, []);

  useEffect(() => {
    if (!onFormValid) return;

    onFormValid(
      formik.values.validations
        .filter((validation) => validation.isRequired)
        .every((validation) => validation.value === "success"),
    );
  }, [formik.values.validations]);

  return (
    <SystemValidationsFormUI loadingValids={loadingValids} formik={formik} />
  );
});

export { SystemValidationsForm };
export type { SystemValidationsFormProps };
