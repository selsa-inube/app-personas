import { FormikProps } from "formik";
import { IFullUser } from "src/context/app/types";
import { evaluateExtraPayment } from "src/services/iclient/credits/evaluateExtraPayment";
import { IExtraPaymentRequest } from "src/services/iclient/credits/evaluateExtraPayment/types";
import { ISimulateCreditEntry } from "../types";

const validateSimulationLimits = (
  formik: FormikProps<ISimulateCreditEntry>,
): boolean => {
  const { amount, deadline, quota, product, simulationWithQuota } =
    formik.values;

  if (!amount || !product) return false;

  if (amount < product.minAmount || amount > product.maxAmount) {
    return false;
  }

  if (simulationWithQuota) {
    if (!quota || quota <= 0) return false;

    const minQuota = amount / 360;
    const maxQuota = amount;

    if (quota < minQuota || quota > maxQuota) {
      return false;
    }
  } else {
    if (!deadline || deadline <= 0) return false;

    const estimatedTotal = deadline * (amount / deadline);

    if (estimatedTotal > product.maxAmount) {
      return false;
    }
  }

  return true;
};

const isStep1Complete = (
  formik: FormikProps<ISimulateCreditEntry>,
): boolean => {
  const {
    amount,
    paymentMethod,
    periodicity,
    simulationWithQuota,
    deadline,
    quota,
  } = formik.values;

  const baseFieldsFilled = !!amount && !!paymentMethod?.id && !!periodicity.id;

  const simulationFieldFilled = simulationWithQuota
    ? !!quota && quota > 0
    : !!deadline && deadline > 0;

  const noErrors = Object.keys(formik.errors).length === 0;

  const withinLimits = validateSimulationLimits(formik);

  return baseFieldsFilled && simulationFieldFilled && noErrors && withinLimits;
};

const calculateExtraordinaryQuotasAvailability = async (
  formik: FormikProps<ISimulateCreditEntry>,
  accessToken: string,
  user: IFullUser,
) => {
  console.log(formik.values.amount);
  console.log(formik.values.periodicity.periodicityInMonths);
  console.log(formik.values.deadline);
  console.log(formik.values.quota);
  if (!formik.values.amount || !formik.values.periodicity.periodicityInMonths)
    return;

  const extraPaymentRequestData: IExtraPaymentRequest = {
    productId: formik.values.product.id,
    customerCode: user.identification,
    amount: formik.values.amount,
    paymentMethodId: formik.values.paymentMethod?.id || "",
    periodicityInMonths: formik.values.periodicity.periodicityInMonths,
    numQuotas: formik.values.deadline,
    quotaValue: formik.values.quota,
    simulationParameter: formik.values.simulationWithQuota
      ? "QuotaValue"
      : "QuotaDeadline",
  };
  const extraPaymentResponse = await evaluateExtraPayment(
    extraPaymentRequestData,
    accessToken,
  );

  if (extraPaymentResponse) return extraPaymentResponse;
};

export {
  calculateExtraordinaryQuotasAvailability,
  isStep1Complete,
  validateSimulationLimits,
};
