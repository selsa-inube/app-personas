import { TagProps } from "@design/data/Tag";
import { cardTypeValuesMock } from "@mocks/products/cards/utils.mocks";
import { EProductType, IAttribute, IProduct } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeText } from "src/utils/texts";

interface IBalanceObligation {
  capitalBalanceInPesos: number;
  totalPending: number;
}

interface INextPaymentValue {
  capitalValue: number;
  total: number;
}

const formatConsumption = (
  data: Record<string, string | number | object>,
): IProduct => {
  const paidDues = data.duesPaid;
  const outstandingDues = Number(data.duesPaid) + Number(data.outstandingDues);
  const currentAccount = `${paidDues}/${outstandingDues}`;

  const nextPaymentValue = data.nextPaymentValue as INextPaymentValue;
  const balanceObligation = data.balanceObligation as IBalanceObligation;

  return {
    id: String(data.obligationId),
    title: "",
    description: "",
    type: EProductType.CONTRIBUTIONS,
    attributes: [
      {
        id: "consumption_date",
        label: "Fecha de consumo",
        value: formatPrimaryDate(new Date(String(data.obligationDate))),
      },
      {
        id: "consumption_value",
        label: "valor de consumo",
        value: "",
      },
      {
        id: "current_interest",
        label: "Intéres corriente",
        value: `${Number(data.periodicRate)}% mv`,
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
    ],
  };
};

const mapFormatConsumption = (
  datos: Record<string, string | number | object>[],
): IProduct[] => {
  return datos.map((dato) => formatConsumption(dato));
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

  const obligationProducts: Record<string, string | number | object>[] =
    Array.isArray(creditQuota.listObligationProducts)
      ? creditQuota.listObligationProducts
      : [];

  return {
    id: String(creditQuota.creditProductCode),
    title: "Crediexpress",
    description: "Informe de movimientos",
    type: EProductType.CREDITCARD,
    attributes,
    consumptions: mapFormatConsumption(obligationProducts),
    tags,
  };
};

export { mapCreditQuotaDetailApiToEntity };
