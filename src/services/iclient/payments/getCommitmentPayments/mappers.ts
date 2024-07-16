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
import { ECommitmentType } from "src/model/entity/product";
import { formatPrimaryDate } from "src/utils/dates";
import { capitalizeEachWord, capitalizeText } from "src/utils/texts";

const mapCommitmentPaymentApiToEntity = (
  commitmentPayment: Record<string, string | number | object>,
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
): IPayment => {
  const lastMovementTheSavingPlans = commitmentPayment.savingPaymentPlans;

  const closeDateWithoutZone =
    commitmentPayment.closePaymentDate &&
    String(commitmentPayment.closePaymentDate).replace("Z", "");

  const lastSavingPlan =
    Array.isArray(lastMovementTheSavingPlans) &&
    lastMovementTheSavingPlans.reduce((acc, curr) =>
      acc.quotaDate > curr.quotaDate ? acc : curr,
    );

  const lastDateWithoutZone = String(lastSavingPlan.quotaDate).replace("Z", "");

  const nextPaymentDate = closeDateWithoutZone
    ? new Date(closeDateWithoutZone)
    : new Date(lastDateWithoutZone);

  const today = new Date();

  today.setUTCHours(5, 0, 0, 0);

  const inArrears = today > nextPaymentDate;

  const nextPaymentValue = Number(commitmentPayment.quotaValue || 0);

  const expiredValue = Number(commitmentPayment.expiredValue || 0);

  const paymentMethodName = capitalizeEachWord(
    String(commitmentPayment.paymentMediumName),
  );

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
    String(commitmentPayment.paymentOtherValueAvailable),
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

  let supportDocumentType = ESupportDocumentType.CONTRIBUTIONCOMMITMENT;
  if (commitmentPayment.type === ECommitmentType.SAVINGSPROGRAMMED) {
    supportDocumentType = ESupportDocumentType.SAVINGCOMMITMENT;
  }

  return {
    id: String(commitmentPayment.numberCommitmentSavings),
    title: capitalizeText(
      String(commitmentPayment.commitmentDescription).toLowerCase(),
    ),
    group: EPaymentGroupType.SAVINGSCOMMITMENT,
    paymentMethodName,
    status: inArrears
      ? EPaymentStatusType.ARREARS
      : EPaymentStatusType.ANYWHERE,
    options,
    tags,
    supportDocumentType,
    allowCustomValue:
      otherValueAvailable !== otherValueAvailableDM.NOT_ALLOW.id,
  };
};

const mapCommitmentPaymentsApiToEntities = (
  commitmentPayments: Record<string, string | number | object>[],
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
): IPayment[] => {
  return commitmentPayments.map((payment) =>
    mapCommitmentPaymentApiToEntity(
      payment,
      withNextValueOption,
      withOtherValueOption,
      withExpiredValueOption,
    ),
  );
};

export { mapCommitmentPaymentApiToEntity, mapCommitmentPaymentsApiToEntities };
