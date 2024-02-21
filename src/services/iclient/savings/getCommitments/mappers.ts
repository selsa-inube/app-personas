import { TagProps } from "@design/data/Tag";
import {
  ECommitmentType,
  IAttribute,
  ICommitment,
  IMovement,
} from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeFirstLetters } from "src/utils/texts";

const mapSavingCommitmentsMovementsApiToEntity = (
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
    .map(mapSavingCommitmentsMovementsApiToEntity)
    .filter((movement) => movement.totalValue > 0)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

const mapSavingsCommitmentsApiToEntity = (
  commitment: Record<string, string | number | object>,
): ICommitment => {
  let inArrears = false;
  let attributes: IAttribute[] = [];
  const today = new Date();

  const commitmentType: ECommitmentType = Object(
    commitment.commitmentType,
  ).code.toUpperCase();

  const movements = Array.isArray(commitment.lastMovementTheSavingPlans)
    ? mapSavingProductMovementsApiToEntities(
        commitment.lastMovementTheSavingPlans,
      )
    : [];

  if (Array.isArray(commitment.savingPaymentPlans)) {
    const lastObject =
      commitment.savingPaymentPlans[commitment.savingPaymentPlans.length - 1];

    const nextQuotaDate = new Date(String(lastObject.quotaDate));
    const valuePendingPayment = lastObject.valuePendingPayment;

    inArrears = today > nextQuotaDate;

    attributes = [
      {
        id: "value_to_pay",
        label: "Valor próximo pago",
        value: Number(valuePendingPayment),
      },
      {
        id: "next_pay_date",
        label: "Fecha próximo pago",
        value: inArrears ? "Inmediato" : formatPrimaryDate(nextQuotaDate),
      },
      {
        id: "pay_method",
        label: "Medio de pago",
        value: capitalizeFirstLetters(String(commitment.paymentMediumName)),
      },
    ];
  }

  const tag: TagProps | undefined = inArrears
    ? {
        label: "En mora",
        appearance: "error",
      }
    : undefined;

  const tempNames: Record<number, string> = {
    //Temp
    4: "Cuota ahorro programado",
    206: "Cuota ahorro permanente",
    205: "Cuota aportes sociales",
  };

  const documentTypeCommitment = Number(
    // Temp
    String(commitment.numberCommitmentSavings).split("-")[0] || 0,
  );

  return {
    id: String(commitment.commitmentId),
    title: tempNames[documentTypeCommitment], // Temp
    tag: tag,
    type: commitmentType,
    attributes,
    movements,
    products: [],
    savingNumber: String(commitment.numberCommitmentSavings),
  };
};

const mapSavingsApiToEntities = (
  commitments: Record<string, string | number | object>[],
): ICommitment[] => {
  return commitments.map((commitment) =>
    mapSavingsCommitmentsApiToEntity(commitment),
  );
};

export { mapSavingsApiToEntities, mapSavingsCommitmentsApiToEntity };
