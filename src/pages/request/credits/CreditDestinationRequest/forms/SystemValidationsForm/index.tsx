import { useAuth } from "@inube/auth";
import { FormikProps, useFormik } from "formik";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AppContext } from "src/context/app";
import { IRequirementRequest } from "src/model/entity/request";
import { getRequirementsForProduct } from "src/services/iclient/credits/getRequirements";
import * as Yup from "yup";
import { SystemValidationsFormUI } from "./interface";
import { ISystemValidationsEntry } from "./types";
import { loadingValidations } from "./utils";

const validationSchema = Yup.object().shape({});

interface SystemValidationsFormProps {
  initialValues: ISystemValidationsEntry;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SystemValidationsForm = forwardRef(function SystemValidationsForm(
  props: SystemValidationsFormProps,
  ref: React.Ref<FormikProps<ISystemValidationsEntry>>,
) {
  const { initialValues, onFormValid } = props;

  const [dynamicSchema] = useState(validationSchema);

  const [loadingValids, setLoadingValids] = useState(false);

  const { accessToken } = useAuth();
  const { user } = useContext(AppContext);

  const formik = useFormik({
    initialValues,
    validationSchema: dynamicSchema,
    validateOnBlur: false,
    onSubmit: async () => true,
  });

  useImperativeHandle(ref, () => formik);

  const getRequirements = () => {
    if (!accessToken) return;

    setLoadingValids(true);
    const requirementsRequest: IRequirementRequest = {
      productId: formik.values.productId,
      productName: formik.values.productName,
      destinationId: formik.values.destinationId,
      destinationName: formik.values.destinationName,
      customerCode: user.identification,
      customerName: `${user.firstName} ${user.secondName} ${user.firstLastName} ${user.secondLastName}`,
      paymentMethodCode: formik.values.paymentMethodCode,
      paymentMethodName: formik.values.paymentMethodName,
      requestAmount: formik.values.requestAmount,
      creditAmount: formik.values.creditAmount,
      capitalPaymentPeriod: formik.values.capitalPaymentPeriod,
      numQuotas: formik.values.numQuotas,
      nominalRate: formik.values.nominalRate,
      amortizationType: formik.values.amortizationType,
      interestPaymentPeriod: formik.values.interestPaymentPeriod,
      periodicity: formik.values.periodicity,
      quotaValue: formik.values.quotaValue,
      amountToTurn: formik.values.amountToTurn,
    };

    getRequirementsForProduct(requirementsRequest, accessToken).then(
      (requirements) => {
        if (!requirements) return;

        formik.setFieldValue("validations", requirements.validations);

        formik.setFieldValue("documents", requirements.documents);

        setLoadingValids(false);
      },
    );
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
