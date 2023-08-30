import { IEntry } from "@design/data/Table/types";
import { IMovement } from "@ptypes/pages/product.types";

const mapMovement = (movement: IEntry): IMovement => {
  return {
    id: movement?.id,
    date: movement?.date,
    reference: movement?.reference,
    description: movement?.description,
    capitalPayment: movement?.capitalPayment,
    interest: movement?.interest,
    lifeInsurance: movement?.lifeInsurance,
    patrimonialInsurance: movement?.patrimonialInsurance,
    capitalization: movement?.capitalization,
    commission: movement?.commission,
    totalValue: movement?.totalValue,
  };
};

export { mapMovement };
