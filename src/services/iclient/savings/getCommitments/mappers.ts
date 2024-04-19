import { TagProps } from "@design/data/Tag";
import {
  ECommitmentType,
  IAttribute,
  ICommitment,
  IMovement,
} from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeFirstLetters, capitalizeText } from "src/utils/texts";

const mapSavingProductCommitmentApiToEntity = (
  product: Record<string, string>,
): string => {
  return product.productNumber;
};

const mapSavingProductsCommitmentsApiToEntities = (
  products: Record<string, string>[],
): string[] => {
  return products.map(mapSavingProductCommitmentApiToEntity);
};

const mapSavingCommitmentMovementApiToEntity = (
  movement: Record<string, string | number | object>,
): IMovement => {
  const buildMovement: IMovement = {
    id: String(movement.movementId),
    date: new Date(String(movement.movementDate)),
    reference: String(movement.movementNumber),
    description: capitalizeFirstLetters(String(movement.movementDescription)),
    totalValue: Number(
      movement.creditMovementPesos || movement.debitMovementPesos,
    ),
  };
  return buildMovement;
};

const mapSavingProductMovementsApiToEntities = (
  movements: Record<string, string | number | object>[],
): IMovement[] => {
  return movements
    .map(mapSavingCommitmentMovementApiToEntity)
    .filter((movement) => movement.totalValue > 0)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

const mapSavingsCommitmentsApiToEntity = (
  commitment: Record<string, string | number | object>,
): ICommitment => {
  const today = new Date();
  today.setUTCHours(5, 5, 5, 5);

  const commitmentType: ECommitmentType = Object(
    commitment.commitmentType,
  ).code.toUpperCase();

  const movements = Array.isArray(commitment.lastMovementTheSavingPlans)
    ? mapSavingProductMovementsApiToEntities(
        commitment.lastMovementTheSavingPlans,
      )
    : [];

  const nextPaymentDate = new Date(String(commitment.closePaymentDate));
  nextPaymentDate.setUTCHours(5, 5, 5, 5);

  const nextPaymentValue = commitment.expiredValue || commitment.quotaValue;

  const inArrears = today > nextPaymentDate;

  const attributes: IAttribute[] = [
    {
      id: "pay_method",
      label: "Medio de pago",
      value: capitalizeFirstLetters(String(commitment.paymentMediumName)),
    },
  ];

  if (commitment.contributionValue) {
    attributes.push({
      id: "commitment_value",
      label: "Compromiso",
      value: String(commitment.contributionValue),
    });
  }

  if (nextPaymentValue) {
    attributes.push({
      id: "value_to_pay",
      label: "Valor próximo pago",
      value: Number(nextPaymentValue),
    });
  }

  if (commitment.closePaymentDate) {
    attributes.push({
      id: "next_pay_date",
      label: "Fecha próximo pago",
      value: inArrears ? "Inmediato" : formatPrimaryDate(nextPaymentDate),
    });
  }

  const tag: TagProps | undefined = inArrears
    ? {
        label: "En mora",
        appearance: "error",
      }
    : undefined;

  return {
    id: String(commitment.numberCommitmentSavings),
    title: capitalizeText(
      String(commitment.commitmentDescription).toLowerCase(),
    ),
    tag: tag,
    type: commitmentType,
    attributes,
    movements,
    products: mapSavingProductsCommitmentsApiToEntities(
      Array.isArray(commitment.productsCommitmentRelationship)
        ? commitment.productsCommitmentRelationship
        : [],
    ),
  };
};

const mapSavingsApiToEntities = (
  commitments: Record<string, string | number | object>[],
): ICommitment[] => {
  return commitments.map(mapSavingsCommitmentsApiToEntity);
};

export { mapSavingsApiToEntities, mapSavingsCommitmentsApiToEntity };
