import { ITag } from "@inubekit/tag";
import { creditQuotaTypeDM } from "src/model/domains/cards/creditQuotaTypeDM.ts";
import { EProductType, IAttribute, IProduct } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeEachWord, capitalizeText } from "src/utils/texts";

const mapConsumptionApiToEntity = (
  consumption: Record<string, string | number | object>,
): IProduct => {
  const paidDues = consumption.paidQuotas;
  const outstandingDues =
    Number(consumption.paidQuotas) + Number(consumption.pendingQuotas);
  const currentAccount = `${paidDues}/${outstandingDues}`;

  const nextPaymentValue = Object(consumption.nextPaymentValue);
  const balanceObligation = Object(consumption.balanceObligation);
  const dateWithoutZone = String(consumption.obligationDate).replace("Z", "");

  const attributes = [
    {
      id: "consumption_date",
      label: "Fecha de consumo",
      value: formatPrimaryDate(new Date(dateWithoutZone)),
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
      value: Number(Object(consumption.balanceObligation).capital || 0),
    },
    {
      id: "interest",
      label: "Intéres corriente",
      value: `${Number(consumption.periodicRate)}% MV`,
    },
    {
      id: "capital",
      label: "Abono capital",
      value: `Cuota ${currentAccount}`,
    },
    {
      id: "min_payment_quota_available",
      label: "Pago minimo de cuota",
      value: Number(nextPaymentValue.capital || 0),
    },
    {
      id: "total_payment_quota_available",
      label: "Pago total de cuota",
      value: Number(nextPaymentValue.total || 0),
    },
    {
      id: "total_capital",
      label: "Pago capital total",
      value: Number(balanceObligation.total || 0),
    },
    {
      id: "min_capital",
      label: "Pago capital minimo",
      value: Number(balanceObligation.capital || 0),
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

  const currentConsumption = Number(
    Object(creditQuota.totalDebt).debtCapital || 0,
  );

  const usedQuota = Number(Object(creditQuota.totalDebt).total || 0);

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
      id: "next_payment",
      label: "Fecha próximo pago",
      value: nextPaymentDateValid,
    },
    {
      id: "min_capital",
      label: "Abono a capital",
      value: Number(Object(creditQuota.nextPaymentValue)?.capital || 0),
    },
    {
      id: "min_interest",
      label: "Interés corriente",
      value: Number(Object(creditQuota.nextPaymentValue)?.interest || 0),
    },
    {
      id: "min_past_due_interest",
      label: "Interés vencido",
      value: Number(Object(creditQuota.nextPaymentValue)?.pastDueInterest || 0),
    },
    {
      id: "min_penalty_interest",
      label: "Interés de mora",
      value: Number(
        Object(creditQuota.nextPaymentValue)?.penaltyInterestValue || 0,
      ),
    },
    {
      id: "min_life_insurance",
      label: "Seguro de vida",
      value: Number(Object(creditQuota.nextPaymentValue)?.lifeInsurance || 0),
    },
    {
      id: "min_other_concepts",
      label: "Otros conceptos",
      value: Number(Object(creditQuota.nextPaymentValue)?.otherConcepts || 0),
    },
    {
      id: "min_capitalization",
      label: "Capitalización",
      value: Number(Object(creditQuota.nextPaymentValue)?.capitalization || 0),
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
      id: "total_capital",
      label: "Abono a capital",
      value: Number(Object(creditQuota.totalBalance)?.capital || 0),
    },
    {
      id: "total_interest",
      label: "Interés corriente",
      value: Number(Object(creditQuota.totalBalance)?.interest || 0),
    },
    {
      id: "total_past_due_interest",
      label: "Interés vencido",
      value: Number(Object(creditQuota.totalBalance)?.pastDueInterest || 0),
    },
    {
      id: "total_penalty_interest",
      label: "Interés de mora",
      value: Number(Object(creditQuota.totalBalance)?.penaltyInterest || 0),
    },
    {
      id: "total_life_insurance",
      label: "Seguro de vida",
      value: Number(Object(creditQuota.totalBalance)?.lifeInsurance || 0),
    },
    {
      id: "total_other_concepts",
      label: "Otros conceptos",
      value: Number(Object(creditQuota.totalBalance)?.otherConcepts || 0),
    },
    {
      id: "total_capitalization",
      label: "Capitalización",
      value: Number(Object(creditQuota.totalBalance)?.capitalization || 0),
    },
    {
      id: "total_payment",
      label: "Pago total",
      value: Object(creditQuota.totalBalance)?.total || "Sin definir",
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
      value: currentConsumption,
    },
    {
      id: "transactions_process",
      label: "Transacciones en proceso",
      value: transactionProcess,
    },
    { id: "used_quota_value", label: "Pago total", value: usedQuota },
  ];

  const tags: ITag[] = inArrears
    ? [{ label: "En mora", appearance: "danger", weight: "strong" }]
    : [];

  const consumptions = Array.isArray(creditQuota.listObligationProducts)
    ? creditQuota.listObligationProducts
    : [];

  return {
    id: String(creditQuota.creditProductCode),
    title: capitalizeEachWord(String(creditQuota.productDescription)),
    description: "Informe de movimientos",
    type: EProductType.CREDITCARD,
    attributes,
    consumptions: mapConsumptionsApiToEntities(consumptions),
    tags,
  };
};

export { mapCreditQuotaDetailApiToEntity };
