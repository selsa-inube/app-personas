import { ITag } from "@inubekit/tag";
import { creditQuotaTypeDM } from "src/model/domains/cards/creditQuotaTypeDM.ts";
import {
  EMovementType,
  EProductType,
  IAttribute,
  IMovement,
  IProduct,
} from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeEachWord, capitalizeText } from "src/utils/texts";

const mapCreditQuotaMovementsApiToEntity = (
  movement: Record<string, string | number | object>,
): IMovement => {
  let transactionType = EMovementType.PAYMENT;
  if (
    Object(movement.typeOfTransation).code === "Consumption" &&
    Object(movement.reverseTransaction).code === "Yes"
  )
    transactionType = EMovementType.REVERSE;
  if (
    Object(movement.typeOfTransation).code === "Consumption" &&
    Object(movement.reverseTransaction).code === "No"
  ) {
    transactionType = EMovementType.PURCHASE;
  }

  const dateWithoutZone = String(movement.movementDate).replace("Z", "");

  const buildMovement: IMovement = {
    id: String(movement.movementNumber),
    description: String(movement.movementDescription),
    totalValue: Number(movement.transactionValue),
    date: new Date(dateWithoutZone),
    type: transactionType,
    reference: String(movement.movementNumber),
  };
  return buildMovement;
};

const mapCreditQuotaMovementsApiToEntities = (
  movements: Record<string, string | number | object>[],
): IMovement[] => {
  return movements.map(mapCreditQuotaMovementsApiToEntity);
};

const mapCreditQuotaApiToEntity = (
  creditQuota: Record<string, string | number | object>,
): IProduct => {
  const movements = Array.isArray(creditQuota.listOfConsumerMovements)
    ? mapCreditQuotaMovementsApiToEntities(creditQuota.listOfConsumerMovements)
    : [];

  const dateWithoutZone = String(creditQuota.nextPaymentDay).replace("Z", "");

  const nextPaymentDate = new Date(dateWithoutZone);

  const today = new Date();
  today.setUTCHours(5, 0, 0, 0);

  const inArrears = today > nextPaymentDate;

  const nextPaymentFormat = inArrears
    ? "Inmediato"
    : formatPrimaryDate(nextPaymentDate);

  const nextPaymentDateValid = creditQuota.nextPaymentDay
    ? nextPaymentFormat
    : "Sin definir";

  const normalizedPaymentMediumName = capitalizeText(
    String(creditQuota.paymentMethodName).toLowerCase(),
  );

  const usedQuota =
    Number(creditQuota.assignedCreditLimit) -
    Number(creditQuota.availableCredit || 0);

  const transactionProcess = usedQuota - Number(creditQuota.totalDebt);

  const attributes: IAttribute[] = [
    {
      id: "available_space",
      label: "Cupo disponible",
      value: Number(creditQuota.availableCredit || 0),
    },
    {
      id: "next_payment",
      label: "Fecha próximo pago",
      value: nextPaymentDateValid,
    },
    {
      id: "next_payment_value",
      label: "Valor próximo pago",
      value: creditQuota.nextPaymentValue || "Sin definir",
    },
    {
      id: "type",
      label: "Tipo",
      value:
        creditQuotaTypeDM.valueOf(
          Object(creditQuota.wayToManageConsumption).code,
        )?.value || "",
    },
    {
      id: "assigned_quota",
      label: "Cupo asignado",
      value: Number(creditQuota.assignedCreditLimit || 0),
    },
    {
      id: "total_payment",
      label: "Pago total",
      value: Object(creditQuota.totalDebt)?.total || "Sin definir",
    },
    {
      id: "payment_method",
      label: "Medio de pago",
      value: normalizedPaymentMediumName,
    },
    {
      id: "used_quota",
      label: "Cupo usado",
      value: usedQuota,
    },
    {
      id: "current_consumption",
      label: "Consumos vigentes",
      value: Number(creditQuota.totalDebt),
    },
    {
      id: "transactions_process",
      label: "Transacciones en proceso",
      value: transactionProcess,
    },
    {
      id: "used_quota_value",
      label: "Pago total",
      value: usedQuota,
    },
  ];
  const tags: ITag[] = inArrears
    ? [
        {
          label: "En mora",
          appearance: "danger",
          weight: "strong",
        },
      ]
    : [];

  return {
    id: String(creditQuota.creditProductCode),
    title: capitalizeEachWord(String(creditQuota.productDescription)),
    description: String(creditQuota.creditProductCode),
    type: EProductType.CREDITCARD,
    attributes,
    movements: movements,
    consumptions: [],
    tags,
  };
};

const mapCreditQuotasApiToEntities = (
  creditQuotas: Record<string, string | number | object>[],
): IProduct[] => {
  return creditQuotas.map((creditQuota) =>
    mapCreditQuotaApiToEntity(creditQuota),
  );
};

export { mapCreditQuotaApiToEntity, mapCreditQuotasApiToEntities };
