import { ITag } from "@inubekit/inubekit";
import { paymentOptionValues } from "@pages/admin/payments/Pay/config/mappers";
import {
  EPaymentOptionType,
  EPaymentStatusType,
  ESupportDocumentType,
} from "@pages/admin/payments/Pay/types";
import { otherValueAvailableDM } from "src/model/domains/payments/otherValueAvailableDM";
import { IPayment, IPaymentOption } from "src/model/entity/payment";
import { ECommitmentType } from "src/model/entity/product";
import { formatPrimaryTimestamp } from "src/utils/dates";
import { capitalizeEachWord, capitalizeText } from "src/utils/texts";

const mapCommitmentPaymentApiToEntity = (
  commitmentPayment: Record<string, string | number | object>,
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
): IPayment => {
  const nextPaymentDate = new Date(
    String(commitmentPayment.nextPaymentDate).replace("Z", ""),
  );

  const today = new Date();

  today.setUTCHours(5, 0, 0, 0);

  const inArrears = today > nextPaymentDate;

  const nextPaymentValue = Number(commitmentPayment.nextPaymentValue || 0);

  const expiredValue = Number(commitmentPayment.expiredValue || 0);

  const paymentMethodName = capitalizeEachWord(
    String(commitmentPayment.paymentMethodName),
  );

  const tags: ITag[] = [
    {
      label: paymentMethodName,
      appearance: "gray",
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
      id: EPaymentOptionType.EXPIRED_VALUE,
      label: "Valor vencido",
      value: expiredValue,
    });
  }

  if (nextPaymentValue && withNextValueOption) {
    options.push({
      id: EPaymentOptionType.NEXT_VALUE,
      label: paymentOptionValues[EPaymentOptionType.NEXT_VALUE],
      description: inArrears
        ? "Inmediato"
        : formatPrimaryTimestamp(nextPaymentDate),
      date: new Date(nextPaymentDate),
      value: nextPaymentValue,
    });
  }

  const otherValueAvailable = otherValueAvailableDM.valueOf(
    String(commitmentPayment.paymentOtherValueAvailable),
  )?.id;

  const commitmentType = String(
    Object(commitmentPayment.commitmentType).code,
  ).toUpperCase();

  let supportDocumentType = ESupportDocumentType.CONTRIBUTIONCOMMITMENT;
  if (commitmentType === ECommitmentType.SAVINGSPROGRAMMED) {
    supportDocumentType = ESupportDocumentType.SAVINGCOMMITMENT;
  }

  return {
    id: String(commitmentPayment.numberCommitmentSavings),
    title: capitalizeText(
      String(commitmentPayment.commitmentDescription).toLowerCase(),
    ),
    group: Object(commitmentPayment.paymentCategory).code,
    paymentMethodName,
    status: inArrears
      ? EPaymentStatusType.ARREARS
      : EPaymentStatusType.ANYWHERE,
    options,
    tags,
    supportDocumentType,
    allowCustomValue:
      otherValueAvailable !== otherValueAvailableDM.NOT_ALLOW.id &&
      withOtherValueOption,
    nextPaymentValue,
    nextPaymentDate,
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
