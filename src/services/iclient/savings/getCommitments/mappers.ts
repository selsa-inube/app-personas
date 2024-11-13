import { ITag } from "@inubekit/tag";
import {
  ECommitmentType,
  EMovementType,
  IAttribute,
  ICommitment,
  IMovement,
} from "src/model/entity/product";
import { currencyFormat } from "src/utils/currency";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeEachWord, capitalizeText } from "src/utils/texts";

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
  const dateWithoutZone = String(movement.movementDate).replace("Z", "");

  let type: EMovementType | undefined;

  if (Object.prototype.hasOwnProperty.call(movement, "creditMovementPesos")) {
    type = EMovementType.CREDIT;
  } else if (
    Object.prototype.hasOwnProperty.call(movement, "debitMovementPesos")
  ) {
    type = EMovementType.DEBIT;
  } else {
    type = undefined;
  }

  const buildMovement: IMovement = {
    id: String(movement.movementId),
    date: new Date(dateWithoutZone),
    reference: String(movement.movementNumber),
    description: capitalizeEachWord(String(movement.movementDescription)),
    totalValue: Number(
      movement.creditMovementPesos || movement.debitMovementPesos,
    ),
    type: type,
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
  today.setUTCHours(5, 0, 0, 0);

  const commitmentType: ECommitmentType = Object(
    commitment.commitmentType,
  ).code.toUpperCase();

  const movements = Array.isArray(commitment.lastMovementTheSavingPlans)
    ? mapSavingProductMovementsApiToEntities(
        commitment.lastMovementTheSavingPlans,
      )
    : [];

  const nextPaymentDate =
    commitment.nextPaymentDate &&
    new Date(String(commitment.nextPaymentDate).replace("Z", ""));

  const nextPaymentValue = commitment.nextPaymentValue;

  const expiredValue = commitment.expiredValue;

  const inArrears = nextPaymentDate && today > nextPaymentDate;

  const attributes: IAttribute[] = [
    {
      id: "payment_method",
      label: "Medio de pago",
      value: capitalizeEachWord(String(commitment.paymentMethodName)),
    },
    {
      id: "expired_value",
      label: "Valor vencido",
      value: Number(expiredValue),
    },
    {
      id: "in_arrears",
      label: "En mora",
      value: String(inArrears),
    },
  ];

  if (commitment.contributionValue || commitment.quotaValue) {
    attributes.push({
      id: "commitment_value",
      label: "Compromiso",
      value: commitment.contributionValue
        ? String(commitment.contributionValue)
        : currencyFormat(Number(commitment.quotaValue)),
    });
  }

  if (nextPaymentValue || expiredValue) {
    attributes.push({
      id: "quota_value",
      label: "Próximo pago",
      value: Number(nextPaymentValue || 0) + Number(expiredValue || 0),
    });

    attributes.push({
      id: "next_payment_value",
      label: "Próximo pago",
      value: Number(nextPaymentValue),
    });
  }

  if (nextPaymentDate) {
    attributes.push({
      id: "next_payment",
      label: "Fecha de pago",
      value: inArrears ? "Inmediato" : formatPrimaryDate(nextPaymentDate),
    });

    attributes.push({
      id: "next_payment_date",
      label: "Fecha de pago",
      value: nextPaymentDate.toISOString(),
    });
  }

  const tag: ITag | undefined = inArrears
    ? {
        label: "En mora",
        appearance: "danger",
        weight: "strong",
      }
    : undefined;

  return {
    id: String(commitment.numberCommitmentSavings),
    title: capitalizeText(
      String(commitment.commitmentDescription).toLowerCase(),
    ),
    tag: nextPaymentDate && nextPaymentValue && tag ? tag : undefined,
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
