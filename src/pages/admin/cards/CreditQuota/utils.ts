import { IProduct } from "src/model/entity/product";

const getUsedQuotaData = (creditQuotas: IProduct[]) => {
  let currentConsumption;
  let accumulatedDebt;
  let transactionsProcess;
  let usedQuotaValue;

    creditQuotas.map((creditQuota) =>{
    creditQuota.attributes.forEach((attr) => {
      if (attr.id === "current_consumption") {
        currentConsumption = attr.value;
      }
      if (attr.id === "accumulated_debt") {
        accumulatedDebt = attr.value;
      }
      if (attr.id === "transactions_process") {
        transactionsProcess = attr.value;
      }
      if (attr.id === "used_quota_value") {
        usedQuotaValue = attr.value;
      }
    });
   })
   
  return {
    currentConsumption: currentConsumption && Number(currentConsumption),
    accumulatedDebt: accumulatedDebt && Number(accumulatedDebt),
    transactionsProcess: transactionsProcess && Number(transactionsProcess),
    usedQuotaValue: Number(usedQuotaValue),
  };
};

export { getUsedQuotaData };
