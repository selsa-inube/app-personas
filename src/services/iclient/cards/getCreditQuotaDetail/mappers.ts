import { TagProps } from "@design/data/Tag";
import { cardTypeValuesMock } from "@mocks/products/cards/utils.mocks";
import { EProductType, IAttribute, IProduct } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeFirstLetters, capitalizeText } from "src/utils/texts";

const mapConsumptionApiToEntity = (
  consumption: Record<string, string | number | object>,
): IProduct => {
  const paidDues = consumption.duesPaid;
  const outstandingDues =
    Number(consumption.duesPaid) + Number(consumption.outstandingDues);
  const currentAccount = `${paidDues}/${outstandingDues}`;

  const nextPaymentValue = Object(consumption.nextPaymentValue);
  const balanceObligation = Object(consumption.balanceObligation);

  const attributes = [
    {
      id: "consumption_date",
      label: "Fecha de consumo",
      value: formatPrimaryDate(new Date(String(consumption.obligationDate))),
    },
    {
      id: "consumption_value",
      label: "Valor del consumo",
      value: "",
    },
    {
      id: "dues_paid",
      label: "Cuotas pagadas",
      value: Number(consumption.duesPaid || 0),
    },
    {
      id: "outstanding_dues",
      label: "Cuotas pendientes",
      value: Number(outstandingDues || 0),
    },
    {
      id: "net_value",
      label: "Saldo de capital",
      value: Number(
        Object(consumption.balanceObligation).capitalBalanceInPesos,
      ),
    },
    {
      id: "current_interest",
      label: "Intéres corriente",
      value: `${Number(consumption.periodicRate)}% MV`,
    },
    {
      id: "capital_payment",
      label: "Abono capital",
      value: `cuota ${currentAccount}`,
    },
    {
      id: "min_payment_quota_available",
      label: "Pago minimo de cuota",
      value: nextPaymentValue.capitalValue,
    },
    {
      id: "total_payment_quota_available",
      label: "Pago total de cuota",
      value: nextPaymentValue.total,
    },
    {
      id: "total_capital_payment",
      label: "Pago capital total",
      value: balanceObligation.totalPending,
    },
    {
      id: "min_capital_payment",
      label: "Pago capital minimo",
      value: balanceObligation.capitalBalanceInPesos,
    },
  ];

  return {
    id: String(consumption.obligationNumber),
    title: String(consumption.obligationNumber),
    description: "Informe de consumos",
    type: EProductType.CONTRIBUTIONS,
    attributes,
  };
};

const mapConsumptionsApiToEntities = (
  consumptions: Record<string, string | number | object>[],
): IProduct[] => {
  return consumptions.map((consumption) =>
    mapConsumptionApiToEntity(consumption),
  );
};

const mapCreditQuotaDetailApiToEntity = (
  creditQuota: Record<string, string | number | object>,
): IProduct => {
  const nextPaymentDate = new Date(String(creditQuota.nextPaymentDay));
  nextPaymentDate.setUTCHours(5, 5, 5, 5);

  const today = new Date();
  today.setUTCHours(5, 5, 5, 5);

  const inArrears = today > nextPaymentDate;

  const nextPaymentFormat = inArrears
    ? "Inmediato"
    : formatPrimaryDate(new Date(String(creditQuota.nextPaymentDay)));

  const nextPaymentDateValid = creditQuota.nextPaymentDay
    ? nextPaymentFormat
    : "Sin definir";

  const normalizedPaymentMediumName = capitalizeText(
    String(creditQuota.paymentMediumName).toLowerCase(),
  );

  const currentConsumption = Number(
    Object(creditQuota.totalDebt).debtCapital || 0,
  );

  const usedQuota = Number(Object(creditQuota.totalDebt).totalPending || 0);

  const transactionProcess = Number(
    Object(creditQuota.totalDebt).transactionsInProcess || 0,
  );

  const attributes: IAttribute[] = [
    {
      id: "available_space",
      label: "Cupo disponible",
      value: Number(creditQuota.availableCredit || 0),
    },
    {
      id: "next_payment_date",
      label: "Fecha próximo pago",
      value: nextPaymentDateValid,
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
      value: Object(creditQuota.nextPaymentValue)?.total || "Sin definir",
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
      value: Object(creditQuota.totalDebt)?.totalPending || "Sin definir",
    },
    {
      id: "payment_method",
      label: "Medio de pago",
      value: normalizedPaymentMediumName,
    },
    { id: "used_quota", label: "Cupo usado", value: usedQuota },
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
    { id: "used_quota_value", label: "Pago total", value: usedQuota },
  ];

  const tags: TagProps[] = inArrears
    ? [{ label: "En mora", appearance: "error" }]
    : [];

  const consumptions = Array.isArray(creditQuota.listObligationProducts)
    ? creditQuota.listObligationProducts
    : [];

  return {
    id: String(creditQuota.creditProductCode),
    title: capitalizeFirstLetters(String(creditQuota.productDescription)),
    description: "Informe de movimientos",
    type: EProductType.CREDITCARD,
    attributes,
    consumptions: mapConsumptionsApiToEntities(consumptions),
    tags,
  };
};

export { mapCreditQuotaDetailApiToEntity };
