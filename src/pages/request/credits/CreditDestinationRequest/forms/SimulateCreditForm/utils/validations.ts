import { FormikProps } from "formik";
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

const isStep1Complete = (formik: FormikProps<ISimulateCreditEntry>): boolean => {
  const { amount, paymentMethod, periodicity, simulationWithQuota, deadline, quota } =
    formik.values;

  const baseFieldsFilled =
    !!amount &&
    !!paymentMethod?.id &&
    !!periodicity.id;

  const simulationFieldFilled = simulationWithQuota
    ? !!quota && quota > 0
    : !!deadline && deadline > 0;

  const noErrors = Object.keys(formik.errors).length === 0;

  const withinLimits = validateSimulationLimits(formik);

  return baseFieldsFilled && simulationFieldFilled && noErrors && withinLimits;
};

const calculateExtraordinaryQuotasAvailability = (
  amount: number,
  deadline: number,
  maxAmount: number,
): { isAvailable: boolean; maxQuantity: number; maxValuePerQuota: number } => {
  const remainingCapacity = maxAmount - amount;
  const quotaCapacity = Math.floor(deadline * 0.3);

  if (remainingCapacity <= 0 || quotaCapacity <= 0) {
    return {
      isAvailable: false,
      maxQuantity: 0,
      maxValuePerQuota: 0,
    };
  }

  const maxQuantity = Math.min(quotaCapacity, 10);
  const maxValuePerQuota = Math.min(remainingCapacity / maxQuantity, 500000);

  return {
    isAvailable: true,
    maxQuantity,
    maxValuePerQuota: Math.floor(maxValuePerQuota),
  };
};

export {
  validateSimulationLimits,
  isStep1Complete,
  calculateExtraordinaryQuotasAvailability,
};
