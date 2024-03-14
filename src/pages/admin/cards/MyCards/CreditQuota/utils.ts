import { ICreditQuotaDetails } from "src/model/entity/product";

const getUsedQuotaData = (selectedProduct: ICreditQuotaDetails) => {
  const quotaDetails = selectedProduct.attributes.find(
    (attribute) => attribute.id === "used_quota",
  );
  const quotaDetailsValue = Array.isArray(quotaDetails?.value)
    ? quotaDetails?.value
    : [];

  const currentConsumption = quotaDetailsValue?.find(
    (attr) => attr.id === "current_consumption",
  );

  const accumulatedDebt = quotaDetailsValue?.find(
    (attr) => attr.id === "accumulated_debt",
  );

  const transactionsProcess = quotaDetailsValue?.find(
    (attr) => attr.id === "transactions_process",
  );

  const usedQuotaValue = quotaDetailsValue?.find(
    (attr) => attr.id === "used_quota_value",
  );

  return {
    currentConsumption: currentConsumption && Number(currentConsumption?.value),
    accumulatedDebt: accumulatedDebt && Number(accumulatedDebt?.value),
    transactionsProcess:
      transactionsProcess && Number(transactionsProcess?.value),
    usedQuotaValue: Number(usedQuotaValue?.value),
  };
};

export { getUsedQuotaData };
