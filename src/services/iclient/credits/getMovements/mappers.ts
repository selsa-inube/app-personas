import { movementDescriptionMock } from "@mocks/products/credits/utils.mocks";
import { IMovement } from "src/model/entity/product";

const mapCreditMovementApiToEntity = (
  movement: Record<string, string | number | object>,
): IMovement => {
  const totalPay =
    Number(movement.capitalCreditPesos || 0) +
    Number(movement.creditInterestPesos || 0) +
    Number(movement.lifeInsuranceCreditPesos || 0) +
    Number(movement.capitalizationCreditPesos || 0);

  const dateWithoutZone = String(movement.movementDate).replace("Z", "");

  const buildMovement: IMovement = {
    id: String(movement.movementId),
    date: new Date(dateWithoutZone),
    reference: String(movement.movementNumber),
    description: String(
      movement.movementDescription ||
        movementDescriptionMock(Object(movement.movementNumber).code),
    ),
    totalValue: totalPay,
  };

  if (movement.capitalCreditPesos) {
    buildMovement.capitalPayment = Number(movement.capitalCreditPesos);
  }

  if (movement.creditInterestPesos) {
    buildMovement.interest = Number(movement.creditInterestPesos);
  }

  if (movement.lifeInsuranceCreditPesos) {
    buildMovement.lifeInsurance = Number(movement.lifeInsuranceCreditPesos);
  }

  if (movement.anotherConceptCreditPesos) {
    buildMovement.patrimonialInsurance = Number(
      movement.anotherConceptCreditPesos,
    );
  }

  if (movement.capitalizationCreditPesos) {
    buildMovement.capitalization = Number(movement.capitalizationCreditPesos);
  }

  if (movement.commissionCreditPesos) {
    buildMovement.commission = Number(movement.commissionCreditPesos);
  }

  return buildMovement;
};

const mapCreditMovementsApiToEntities = (
  movements: Record<string, string | number | object>[],
): IMovement[] => {
  return movements
    .map((movement) => mapCreditMovementApiToEntity(movement))
    .filter((movement) => movement.totalValue > 0)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

export { mapCreditMovementApiToEntity, mapCreditMovementsApiToEntities };
