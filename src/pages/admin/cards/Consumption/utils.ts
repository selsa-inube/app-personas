import { consumptionsMocks } from "@mocks/products/cards/consumptions.mocks";
import { IProduct } from "src/model/entity/product";

const validateConsumption = async (
  consumptions: IProduct[],
  consumptionId: string,
  //userIdentification: string,
  //accessToken: string,
) => {
  let currentConsumptions = [...consumptions];

  if (currentConsumptions.length === 0) {
    currentConsumptions = consumptionsMocks;
  }

  const selectedConsumption = currentConsumptions.find((consumption) => {
    return consumption.id === consumptionId;
  });

  return {
    selectedConsumption,
    newConsumptions: currentConsumptions,
  };
};

const validateConsumptionMovements = async (
  selectedConsumption: IProduct,
  consumptions: IProduct[],
  // accessToken: string,
) => {
  const currentConsumptions = [...consumptions];
  const newSelectedConsumption = { ...selectedConsumption };

  for (const ix in currentConsumptions) {
    if (currentConsumptions[ix].id === selectedConsumption.id) {
      if (currentConsumptions[ix].movements?.length === 0) {
        const movements = consumptionsMocks.find(
          (consumption) => consumption.id === selectedConsumption.id,
        )?.movements;
        currentConsumptions[ix].movements = movements;
      }

      break;
    }
  }

  return {
    newSelectedConsumption,
    newConsumptions: currentConsumptions,
  };
};

export { validateConsumption, validateConsumptionMovements };
