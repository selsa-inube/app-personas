import { IEntry } from "@design/data/Table/types";
import { IAmortization } from "@ptypes/pages/product.types";

const mapPayment = (payment: IEntry): IAmortization => {
  return {
    id: payment?.id,
    date: payment?.date,
    paymentNumber: payment?.paymentNumber,
    capitalPayment: payment?.capitalPayment,
    interest: payment?.interest,
    lifeInsurance: payment?.lifeInsurance,
    patrimonialInsurance: payment?.patrimonialInsurance,
    capitalization: payment?.capitalization,
    others: payment?.others,
    totalMonthlyValue: payment?.totalMonthlyValue,
    projectedBalance: payment?.projectedBalance,
  };
};

export { mapPayment };
