import { TagProps } from "@design/data/Tag";
import { paymentOptionValues } from "@pages/admin/payments/Pay/config/mappers";
import {
  EPaymentGroupType,
  EPaymentOptionType,
  EPaymentStatusType,
  ESupportDocumentType,
} from "@pages/admin/payments/Pay/types";
import { otherValueAvailableDM } from "src/model/domains/payments/otherValueAvailableDM";
import { IPayment, IPaymentOption } from "src/model/entity/payment";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeText } from "src/utils/texts";

const mapObligationPaymentApiToEntity = (
  obligationPayment: Record<string, string | number | object>,
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
  withTotalValueOption: boolean,
): IPayment => {
  const dateWithoutZone = String(obligationPayment.nextPaymentDate).replace(
    "Z",
    "",
  );
  const nextPaymentDate = new Date(dateWithoutZone);

  const today = new Date();

  today.setUTCHours(5, 0, 0, 0);

  const inArrears = today > nextPaymentDate;

  const nextCapital = Number(
    Object(obligationPayment.nextPaymentValue).capital || 0,
  );

  const nextInterest = Number(
    Object(obligationPayment.nextPaymentValue).interest || 0,
  );

  const nextPastDueInterest = Number(
    Object(obligationPayment.nextPaymentValue)?.pastDueInterest || 0,
  );

  const nextPenaltyInterest = Number(
    Object(obligationPayment.nextPaymentValue)?.penaltyInterest || 0,
  );

  const nextLifeInsurance = Number(
    Object(obligationPayment.nextPaymentValue)?.lifeInsurance || 0,
  );

  const nextOtherConcepts = Number(
    Object(obligationPayment.nextPaymentValue)?.otherConcepts || 0,
  );

  const nextCapitalization = Number(
    Object(obligationPayment.nextPaymentValue)?.capitalization || 0,
  );

  const expiredCapital = Number(
    Object(obligationPayment.valueExpired)?.capital || 0,
  );

  const expiredInterest = Number(
    Object(obligationPayment.valueExpired)?.interest || 0,
  );

  const expiredPastDueInterest = Number(
    Object(obligationPayment.valueExpired)?.pastDueInterest || 0,
  );

  const expiredPenaltyInterest = Number(
    Object(obligationPayment.valueExpired)?.penaltyInterest || 0,
  );

  const expiredLifeInsurance = Number(
    Object(obligationPayment.valueExpired)?.lifeInsurance || 0,
  );

  const expiredOtherConcepts = Number(
    Object(obligationPayment.valueExpired)?.otherConcepts || 0,
  );

  const expiredCapitalization = Number(
    Object(obligationPayment.valueExpired)?.capitalization || 0,
  );

  const totalCapital = Number(
    Object(obligationPayment.balanceObligation)?.capital || 0,
  );

  const totalLifeInsurance = Number(
    Object(obligationPayment.balanceObligation)?.lifeInsurance || 0,
  );

  const totalOtherConcepts = Number(
    Object(obligationPayment.balanceObligation)?.otherConcepts || 0,
  );

  const totalCapitalization = Number(
    Object(obligationPayment.balanceObligation)?.capitalization || 0,
  );

  const totalInterest = Number(
    Object(obligationPayment.balanceObligation)?.interest || 0,
  );

  const totalPenaltyInterest = Number(
    Object(obligationPayment.balanceObligation)?.penaltyInterest || 0,
  );

  const nextPaymentValue =
    Number(nextCapital >= 0 ? nextCapital : 0) +
    Number(nextInterest >= 0 ? nextInterest : 0) +
    Number(nextPastDueInterest >= 0 ? nextPastDueInterest : 0) +
    Number(nextPenaltyInterest >= 0 ? nextPenaltyInterest : 0);
  Number(nextLifeInsurance >= 0 ? nextLifeInsurance : 0) +
    Number(nextOtherConcepts >= 0 ? nextOtherConcepts : 0) +
    Number(nextCapitalization >= 0 ? nextCapitalization : 0);

  const expiredValue =
    Number(expiredCapital >= 0 ? expiredCapital : 0) +
    Number(expiredInterest >= 0 ? expiredInterest : 0) +
    Number(expiredPastDueInterest >= 0 ? expiredPastDueInterest : 0) +
    Number(expiredPenaltyInterest >= 0 ? expiredPenaltyInterest : 0);
  Number(expiredLifeInsurance >= 0 ? expiredLifeInsurance : 0) +
    Number(expiredOtherConcepts >= 0 ? expiredOtherConcepts : 0) +
    Number(expiredCapitalization >= 0 ? expiredCapitalization : 0);

  const totalValue =
    Number(totalCapital >= 0 ? totalCapital : 0) +
    Number(totalLifeInsurance >= 0 ? totalLifeInsurance : 0) +
    Number(totalOtherConcepts >= 0 ? totalOtherConcepts : 0) +
    Number(totalCapitalization >= 0 ? totalCapitalization : 0) +
    Number(totalInterest >= 0 ? totalInterest : 0) +
    Number(totalPenaltyInterest >= 0 ? totalPenaltyInterest : 0);

  const paymentMethodName = String(obligationPayment.paymentMethodName);

  const tags: TagProps[] = [
    {
      label: paymentMethodName,
      appearance: "gray",
      modifier: "clear",
      textAppearance: "gray",
    },
  ];

  if (inArrears) {
    tags.push({
      label: "En mora",
      appearance: "danger",
    });
  }

  const options: IPaymentOption[] = [];

  if (expiredValue && withExpiredValueOption) {
    options.push({
      id: EPaymentOptionType.EXPIREDVALUE,
      label: "Valor vencido",
      value: expiredValue,
    });
  }

  if (nextPaymentValue && withNextValueOption) {
    options.push({
      id: EPaymentOptionType.NEXTVALUE,
      label: paymentOptionValues[EPaymentOptionType.NEXTVALUE],
      description: inArrears ? "Inmediato" : formatPrimaryDate(nextPaymentDate),
      date: new Date(nextPaymentDate),
      value: nextPaymentValue,
    });
  }

  const otherValueAvailable = otherValueAvailableDM.valueOf(
    String(obligationPayment.paymentOtherValueAvailable),
  )?.id;

  if (
    withOtherValueOption &&
    otherValueAvailable !== otherValueAvailableDM.NOT_ALLOW.id
  ) {
    options.push({
      id: EPaymentOptionType.OTHERVALUE,
      label: "Abono a capital",
      value: 0,
      hidden: true,
    });
  }

  if (totalValue && withTotalValueOption) {
    options.push({
      id: EPaymentOptionType.TOTALVALUE,
      label: "Pago total",
      value: totalValue,
    });
  }

  return {
    id: String(obligationPayment.obligationNumber),
    title: capitalizeText(String(obligationPayment.productName).toLowerCase()),
    group: EPaymentGroupType.CREDITS,
    paymentMethodName,
    status: inArrears
      ? EPaymentStatusType.ARREARS
      : EPaymentStatusType.ANYWHERE,
    options,
    tags,
    supportDocumentType: ESupportDocumentType.FINANCIALPORTFOLIO,
    lineCode: String(obligationPayment.lineCode),
    paymentMethod: String(obligationPayment.paymentMethod),
    allowCustomValue:
      otherValueAvailable !== otherValueAvailableDM.NOT_ALLOW.id,
  };
};

const mapCreditPaymentsApiToEntities = (
  obligationPayments: Record<string, string | number | object>[],
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
  withTotalValueOption: boolean,
): IPayment[] => {
  return obligationPayments.map((payment) =>
    mapObligationPaymentApiToEntity(
      payment,
      withNextValueOption,
      withOtherValueOption,
      withExpiredValueOption,
      withTotalValueOption,
    ),
  );
};

export { mapCreditPaymentsApiToEntities, mapObligationPaymentApiToEntity };
