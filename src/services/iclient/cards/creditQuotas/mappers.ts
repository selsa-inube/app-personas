import { TagProps } from "@design/data/Tag";
import { cardTypeValuesMock } from "@mocks/products/cards/utils.mocks";
import {
  EMovementType,
  EProductType,
  IAttribute,
  IMovement,
  IProduct,
} from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeText } from "src/utils/texts";

const mapCreditQuotaMovementsApiToEntity = (
  movement: Record<string, string | number | object>,
): IMovement => {
  const typeTransation = () => {
    if (
      Object(movement.typeOfTransation).code === "Consumption" &&
      Object(movement.reverseTransaction).code === "Yes"
    )
      return EMovementType.REVERSE;
    if (
      Object(movement.typeOfTransation).code === "Consumption" &&
      Object(movement.reverseTransaction).code === "No"
    )
      return EMovementType.PURCHASE;
    return EMovementType.PAYMENT;
  };

  const buildMovement: IMovement = {
    id: String(movement.movementNumber),
    description: String(movement.movementDescription),
    totalValue: Number(movement.transactionValue),
    date: new Date(String(movement.movementDate)),
    type: typeTransation(),
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

  const nextPaymentDate = new Date(String(creditQuota.nextPaymentDay));
  nextPaymentDate.setUTCHours(5, 5, 5, 5);

  const today = new Date();

  today.setUTCHours(5, 5, 5, 5);

  const inArrears = today > nextPaymentDate;

  const nextPayment = inArrears
    ? "Inmediato"
    : formatPrimaryDate(new Date(String(creditQuota.nextPaymentDate)));

  const normalizedPaymentMediumName = capitalizeText(
    String(creditQuota.paymentMediumName).toLowerCase(),
  );

  const currentConsumption =
    Array.isArray(creditQuota.listObligationProducts) &&
    creditQuota.listObligationProducts.reduce(
      (acc, value) => acc + value.balanceObligation.capitalBalanceInPesos,
      0,
    );

  const usedQuota =
    Number(creditQuota.assignedCreditLimit) -
    Number(creditQuota.availableCredit || 0);

  const transactionProcess = usedQuota - currentConsumption;

  const attributes: IAttribute[] = [
    {
      id: "available_space",
      label: "Cupo disponible",
      value: Number(creditQuota.availableCredit || 0),
    },
    {
      id: "total_dedt",
      label: "Deuda total",
      value: Object(creditQuota.totalDebt).totalPending,
    },
    {
      id: "next_payment_date",
      label: "Fecha próximo pago",
      value: nextPayment,
    },
    {
      id: "min_capital_payment",
      label: "Abono a capital",
      value: Object(creditQuota.nextPaymentValue)?.capitalValue,
    },
    {
      id: "min_current_interest",
      label: "Interés corriente",
      value: Object(creditQuota.nextPaymentValue)?.interestValue,
    },
    {
      id: "min_arrears_interest",
      label: "Interés de mora",
      value: Object(creditQuota.nextPaymentValue)?.penalityInterestValue,
    },
    {
      id: "next_payment_value",
      label: "Valor próximo pago",
      value: Object(creditQuota.nextPaymentValue)?.total,
    },
    {
      id: "type",
      label: "Tipo",
      value:
        cardTypeValuesMock[Object(creditQuota.wayToManageConsumption).code],
    },
    {
      id: "assigned_quota",
      label: "Cupo asignado",
      value: Number(creditQuota.assignedCreditLimit),
    },
    {
      id: "total_capital_payment",
      label: "Abono a capital",
      value: Object(creditQuota.totalDebt)?.capitalBalanceInPesos,
    },
    {
      id: "total_current_interest",
      label: "Interés corriente",
      value: Object(creditQuota.totalDebt)?.theBalanceOfRemunerativeInterest,
    },
    {
      id: "total_arrears_interest",
      label: "Interés de mora",
      value: Object(creditQuota.totalDebt)?.theBalanceOfDefaultInterest,
    },
    {
      id: "full_payment",
      label: "Pago total",
      value: Object(creditQuota.totalDebt)?.totalPending,
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
      value: Number(currentConsumption),
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
  const tags: TagProps[] = inArrears
    ? [
        {
          label: "En mora",
          appearance: "error",
        },
      ]
    : [];

  return {
    id: String(creditQuota.creditProductCode),
    title: "Crediexpress",
    description: "Informe de movimientos",
    type: EProductType.CREDITCARD,
    attributes,
    movements: movements,
    amortization: [],
    consumptions: [],
    tags,
  };
};

const mapCreditQuotaApiToEntities = (
  creditQuotas: Record<string, string | number | object>[],
): IProduct[] => {
  return creditQuotas.map((creditQuota) =>
    mapCreditQuotaApiToEntity(creditQuota),
  );
};

export { mapCreditQuotaApiToEntity, mapCreditQuotaApiToEntities };
