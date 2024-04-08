import { IProduct } from "src/model/entity/product";
import { getDetailForCreditQuota } from "src/services/iclient/cards/getCreditQuotaDetail";
import { getMovementsForCredit } from "src/services/iclient/credits/getMovements";

const validateConsumption = async (
  cardId: string,
  consumptionId: string,
  accessToken: string,
  creditQuotaDetail?: IProduct,
) => {
  let currentCreditQuotaDetail = creditQuotaDetail;

  if (!currentCreditQuotaDetail) {
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
    newCreditQuotaDetail: currentCreditQuotaDetail,
  };
};

const validateConsumptionMovements = async (
  selectedConsumption: IProduct,
  accessToken: string,
) => {
  const currentConsumption = { ...selectedConsumption };

  if (selectedConsumption.movements?.length === 0) {
    const movements = await getMovementsForCredit(
      selectedConsumption.id,
      accessToken,
    );
    currentConsumption.movements = movements;
  }

  return {
    newSelectedConsumption: currentConsumption,
  };
};

export { validateConsumption, validateConsumptionMovements };
