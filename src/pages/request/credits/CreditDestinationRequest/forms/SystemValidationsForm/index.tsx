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
import { getRequirementsForProduct } from "src/services/iclient/credits/getRequirements";
import { IRequirementRequest } from "src/services/iclient/credits/getRequirements/types";
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

    const requestDate = new Date();

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
      amount: formik.values.amount,
      deadline: formik.values.deadline,
      rate: formik.values.rate,
      amortizationType: formik.values.amortizationType,
      interestPaymentPeriod: formik.values.periodicity,
      periodicity: formik.values.periodicity,
      quota: formik.values.quota,
      netValue: formik.values.netValue,
      requestDate,
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
