import { ITag } from "@inubekit/inubekit";
import { paymentOptionValues } from "@pages/admin/payments/Pay/config/mappers";
import {
  EPaymentGroupType,
  EPaymentOptionType,
  EPaymentStatusType,
  ESupportDocumentType,
} from "@pages/admin/payments/Pay/types";
import { otherValueAvailableDM } from "src/model/domains/payments/otherValueAvailableDM";
import { IPayment, IPaymentOption } from "src/model/entity/payment";
import { formatPrimaryTimestamp } from "src/utils/dates";
import { capitalizeEachWord, capitalizeText } from "src/utils/texts";

const mapObligationPaymentApiToEntity = (
  creditPayment: Record<string, string | number | object>,
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
  withTotalValueOption: boolean,
): IPayment => {
  const dateWithoutZone = String(creditPayment.nextPaymentDate).replace(
    "Z",
    "",
  );
  const nextPaymentDate = new Date(dateWithoutZone);

  const today = new Date();

  today.setUTCHours(5, 0, 0, 0);

  const inArrears = today > nextPaymentDate;

  const nextCapital = Number(
    Object(creditPayment.nextPaymentValue).capital || 0,
  );

  const nextInterest = Number(
    Object(creditPayment.nextPaymentValue).interest || 0,
  );

  const nextPastDueInterest = Number(
    Object(creditPayment.nextPaymentValue)?.pastDueInterest || 0,
  );

  const nextPenaltyInterest = Number(
    Object(creditPayment.nextPaymentValue)?.penaltyInterest || 0,
  );

  const nextLifeInsurance = Number(
    Object(creditPayment.nextPaymentValue)?.lifeInsurance || 0,
  );

  const nextOtherConcepts = Number(
    Object(creditPayment.nextPaymentValue)?.otherConcepts || 0,
  );

  const nextCapitalization = Number(
    Object(creditPayment.nextPaymentValue)?.capitalization || 0,
  );

  const expiredCapital = Number(
    Object(creditPayment.expiredValue)?.capital || 0,
  );

  const expiredInterest = Number(
    Object(creditPayment.expiredValue)?.interest || 0,
  );

  const expiredPastDueInterest = Number(
    Object(creditPayment.expiredValue)?.pastDueInterest || 0,
  );

  const expiredPenaltyInterest = Number(
    Object(creditPayment.expiredValue)?.penaltyInterest || 0,
  );

  const expiredLifeInsurance = Number(
    Object(creditPayment.expiredValue)?.lifeInsurance || 0,
  );

  const expiredOtherConcepts = Number(
    Object(creditPayment.expiredValue)?.otherConcepts || 0,
  );

  const expiredCapitalization = Number(
    Object(creditPayment.expiredValue)?.capitalization || 0,
  );

  const totalCapital = Number(
    Object(creditPayment.balanceObligation)?.capital || 0,
  );

  const totalLifeInsurance = Number(
    Object(creditPayment.balanceObligation)?.lifeInsurance || 0,
  );

  const totalOtherConcepts = Number(
    Object(creditPayment.balanceObligation)?.otherConcepts || 0,
  );

  const totalCapitalization = Number(
    Object(creditPayment.balanceObligation)?.capitalization || 0,
  );

  const totalInterest = Number(
    Object(creditPayment.balanceObligation)?.interest || 0,
  );

  const totalPenaltyInterest = Number(
    Object(creditPayment.balanceObligation)?.penaltyInterest || 0,
  );

  const nextPaymentValue =
    Number(nextCapital >= 0 ? nextCapital : 0) +
    Number(nextInterest >= 0 ? nextInterest : 0) +
    Number(nextPastDueInterest >= 0 ? nextPastDueInterest : 0) +
    Number(nextPenaltyInterest >= 0 ? nextPenaltyInterest : 0) +
    Number(nextLifeInsurance >= 0 ? nextLifeInsurance : 0) +
    Number(nextOtherConcepts >= 0 ? nextOtherConcepts : 0) +
    Number(nextCapitalization >= 0 ? nextCapitalization : 0);

  const expiredValue =
    Number(expiredCapital >= 0 ? expiredCapital : 0) +
    Number(expiredInterest >= 0 ? expiredInterest : 0) +
    Number(expiredPastDueInterest >= 0 ? expiredPastDueInterest : 0) +
    Number(expiredPenaltyInterest >= 0 ? expiredPenaltyInterest : 0) +
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

  const normalizedProductName = `${capitalizeText(
    String(creditPayment.productName).toLowerCase(),
  )} - ${capitalizeText(String(creditPayment.moneyDestinationName).toLowerCase())}`;

  const paymentMethodName = capitalizeEachWord(
    String(creditPayment.paymentMethodName),
  );

  const tags: ITag[] = [{ label: paymentMethodName, appearance: "gray" }];

  if (inArrears) {
    tags.push({ label: "En mora", appearance: "danger" });
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
      description: inArrears
        ? "Inmediato"
        : formatPrimaryTimestamp(nextPaymentDate),
      date: new Date(nextPaymentDate),
      value: nextPaymentValue,
    });
  }

  const otherValueAvailable = otherValueAvailableDM.valueOf(
    String(creditPayment.paymentOtherValueAvailable),
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
    id: String(creditPayment.obligationNumber),
    title: normalizedProductName,
    group: EPaymentGroupType.CREDITS,
    paymentMethodName,
    status: inArrears
      ? EPaymentStatusType.ARREARS
      : EPaymentStatusType.ANYWHERE,
    options,
    tags,
    supportDocumentType: ESupportDocumentType.FINANCIALPORTFOLIO,
    lineCode: String(creditPayment.lineCode),
    paymentMethod: String(creditPayment.paymentMethod),
    allowCustomValue:
      otherValueAvailable !== otherValueAvailableDM.NOT_ALLOW.id,
  };
};

const mapCreditPaymentsApiToEntities = (
  creditPayments: Record<string, string | number | object>[],
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
  withTotalValueOption: boolean,
): IPayment[] => {
  return creditPayments.map((payment) =>
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
