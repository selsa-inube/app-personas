import { TagProps } from "@design/data/Tag";
import {
  amortizationTypeValuesMock,
  guaranteeTypeValuesMock,
  peridiocityValuesMock,
} from "@mocks/products/credits/utils.mocks";
import { IProduct, ProductType } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeText } from "src/utils/texts";

const mapCreditApiToEntity = (
  credit: Record<string, string | number | object>,
): IProduct => {
  const nextPaymentDate = new Date(String(credit.nextPaymentDate));
  nextPaymentDate.setUTCHours(0, 0, 0, 0);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const heightQuota = String(credit.heightQuota).split(" ");
  const currentQuota = heightQuota.length > 0 ? heightQuota[0] : 0;
  const maxQuota = heightQuota.length > 2 ? heightQuota[2] : 0;

  const inArrears = today > nextPaymentDate;

  const nextPayment = inArrears
    ? "Inmediato"
    : formatPrimaryDate(nextPaymentDate);

  const differenceDays =
    (today.getTime() - nextPaymentDate.getTime()) / (1000 * 60 * 60 * 24);

  const nextPaymentCapital =
    Object(credit.valueExpired)?.capitalValuePending ||
    Object(credit.nextPaymentValue).capitalValuePending;

  const nextPaymentInterest =
    Object(credit.valueExpired)?.interestValuePending ||
    Object(credit.nextPaymentValue).interestValuePending;

  const nextPaymentArrearsInterest =
    Object(credit.accumulatedByObligations).length > 0 &&
    Object(credit.accumulatedByObligations)[0].PenalityInterestBalance;

  const nextPaymentValue =
    Object(credit.valueExpired)?.totalPending ||
    Object(credit.nextPaymentValue).totalPending;

  const normalizedPaymentMethodName = capitalizeText(
    String(credit.paymentMethodName).toLowerCase(),
  );
  const interesRate =
    (Object(credit.accumulatedByObligations)[0].spreadCurrentRate || 0) +
    (Object(credit.accumulatedByObligations)[0].currentFixedPoints || 0);

  const roundInteresRate =
    interesRate == 0 ? interesRate : interesRate.toFixed(2);

  const attributes = [
    {
      id: "loan_date",
      label: "Fecha de préstamo",
      value: formatPrimaryDate(new Date(String(credit.obligationDate))),
    },
    {
      id: "loan_value",
      label: "Valor del préstamo",
      value: credit.amount,
    },
    {
      id: "next_payment_date",
      label: "Fecha próximo pago",
      value: nextPayment,
    },
    {
      id: "next_payment_value",
      label: "Valor próximo pago",
      value: nextPaymentValue,
    },
    {
      id: "quote",
      label: "Altura de cuota",
      value: `${currentQuota} de ${maxQuota}`,
    },
    {
      id: "peridiocity",
      label: "Periodicidad",
      value: peridiocityValuesMock[String(credit.periodicityOfQuota)],
    },
    {
      id: "payment_means",
      label: "Medio de pago",
      value: normalizedPaymentMethodName,
    },
    {
      id: "net_value",
      label: "Saldo de capital",
      value: Number(Object(credit.balanceObligation).capitalBalanceInPesos),
    },
    {
      id: "amortization_type",
      label: "Tipo de amortización",
      value: amortizationTypeValuesMock[Object(credit.amortization).code],
    },
    {
      id: "guarantee_type",
      label: "Tipo de garantía",
      value: guaranteeTypeValuesMock[Object(credit.typeOfGuarantee).code],
    },
    { id: "terms", label: "Plazo", value: `${maxQuota} Meses` },

    {
      id: "interest_rate",
      label: "Tasa de interés",
      value: `${roundInteresRate} % NAMV`,
    },
  ];

  if (inArrears) {
    attributes.push({
      id: "days_past_due",
      label: "Días de mora",
      value: differenceDays,
    });
  }

  if (nextPaymentCapital) {
    attributes.push({
      id: "next_payment_capital",
      label: "Capital próximo pago",
      value: nextPaymentCapital,
    });
  }
  if (nextPaymentInterest) {
    attributes.push({
      id: "next_payment_interest",
      label: "Interes próximo pago",
      value: nextPaymentInterest,
    });
  }
  if (nextPaymentArrearsInterest) {
    attributes.push({
      id: "next_payment_arrears_interest",
      label: "interés de mora",
      value: nextPaymentArrearsInterest,
    });
  }

  const tags: TagProps[] = inArrears
    ? [
        {
          label: "En mora",
          appearance: "error",
        },
      ]
    : [];

  const normalizedProductName = capitalizeText(
    String(credit.productName).toLowerCase(),
  );

  return {
    id: String(credit.obligationNumber),
    title: normalizedProductName,
    description: `${normalizedProductName} ${credit.obligationNumber}`,
    type: String(credit.lineCode) as ProductType,
    attributes,
    movements: [],
    amortization: [],
    tags,
  };
};

const mapCreditsApiToEntities = (
  credits: Record<string, string | number | object>[],
): IProduct[] => {
  return credits
    .filter((credit) => credit.lineCode !== "CE")
    .map((credit) => mapCreditApiToEntity(credit));
};

export { mapCreditApiToEntity, mapCreditsApiToEntities };
