import { IMovement } from "src/model/entity/product";
import { getCreditMovementDescription } from "./utils";

const mapCreditMovementApiToEntity = (
  movement: Record<string, string | number | object>,
): IMovement => {
  const totalPay =
    Number(movement.capitalCreditPesos || 0) +
    Number(movement.creditInterestPesos || 0) +
    Number(movement.lifeInsuranceCreditPesos || 0) +
    Number(movement.anotherConceptCreditPesos || 0) +
    Number(movement.capitalizationCreditPesos || 0) +
    Number(movement.commissionCreditPesos || 0);

  const dateWithoutZone = String(movement.movementDate).replace("Z", "");

  const movementCode = String(movement.movementNumber).split("-")[2];

  const buildMovement: IMovement = {
    id: String(movement.movementId),
    date: new Date(dateWithoutZone),
    reference: String(movement.movementNumber),
    description: String(
      movement.movementDescription ||
        getCreditMovementDescription(movementCode),
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
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export { mapCreditMovementApiToEntity, mapCreditMovementsApiToEntities };
