import { consumptionsMocks } from "@mocks/products/cards/consumptions.mocks";
import { getDetailForCreditQuota } from "src/services/iclient/cards/getCreditQuotaDetail";
import { IProduct } from "src/model/entity/product";

const validateConsumption = async (
  cardId: string,
  accessToken: string,
  consumptionId: string,
  creditQuotaDetail?: IProduct,
) => {
  let currentCreditQuotaDetail;
  currentCreditQuotaDetail = { ...creditQuotaDetail };

  if (currentCreditQuotaDetail) {
    currentCreditQuotaDetail = await getDetailForCreditQuota(
      cardId,
      accessToken,
    );
  }

  const selectedConsumption = currentCreditQuotaDetail?.consumptions?.find(
    (consumption) => {
      return consumption.id === consumptionId;
    },
  );

  return {
    selectedConsumption,
    newConsumptions: currentCreditQuotaDetail as IProduct,
  };
};

const validateConsumptionMovements = async (
  selectedConsumption: IProduct,
  consumption: IProduct,
) => {
  const currentConsumption = { ...consumption };
  const newSelectedConsumption = { ...selectedConsumption };

  if (currentConsumption.id === selectedConsumption.id) {
    if (currentConsumption.movements?.length === 0) {
      const movements = consumptionsMocks.find(
        (consumption) => consumption.id === selectedConsumption.id,
      )?.movements;
      currentConsumption.movements = movements;
    }
  }

  return {
    newConsumptions: currentConsumption,
    newSelectedConsumption,
  };
};

export { validateConsumption, validateConsumptionMovements };
