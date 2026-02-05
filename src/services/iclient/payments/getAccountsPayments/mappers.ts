import { ITag } from "@inubekit/inubekit";
import { paymentOptionValues } from "@pages/admin/payments/Pay/config/mappers";
import {
  EPaymentOptionType,
  EPaymentStatusType,
  ESupportDocumentType,
} from "@pages/admin/payments/Pay/types";
import { otherValueAvailableDM } from "src/model/domains/payments/otherValueAvailableDM";
import { IPayment, IPaymentOption } from "src/model/entity/payment";
import { formatPrimaryTimestamp } from "src/utils/dates";
import { capitalizeEachWord, capitalizeText } from "src/utils/texts";

const mapAccountsPaymentApiToEntity = (
  accountPayment: Record<string, string | number | object>,
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
  withTotalValueOption: boolean,
): IPayment => {
  const nextPaymentDate = new Date(
    String(accountPayment.nextPaymentDate).replace("Z", ""),
  );

  const today = new Date();

  today.setUTCHours(5, 0, 0, 0);

  const inArrears = today > nextPaymentDate;

  const nextPaymentValue = Number(accountPayment.nextPaymentValue || 0);

  const expiredValue = Number(accountPayment.expiredValue || 0);

  const totalValue = Number(accountPayment.totalBalance || 0);

  const paymentMethodName = capitalizeEachWord(
    String(accountPayment.paymentMethodName),
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
    String(accountPayment.paymentOtherValueAvailable),
  )?.id;

  if (totalValue && withTotalValueOption) {
    options.push({
      id: EPaymentOptionType.TOTAL_VALUE,
      label: "Pago total",
      value: totalValue,
    });
  }

  return {
    id: String(accountPayment.obligationNumber),
    title: capitalizeText(
      String(accountPayment.productDescription).toLowerCase(),
    ),
    group: Object(accountPayment.paymentCategory).code,
    paymentMethodName,
    status: inArrears
      ? EPaymentStatusType.ARREARS
      : EPaymentStatusType.ANYWHERE,
    options,
    tags,
    supportDocumentType: ESupportDocumentType.ACCOUNTSRECEIVABLE,
    paymentMethod: String(accountPayment.paymentMethod),
    allowCustomValue:
      otherValueAvailable !== otherValueAvailableDM.NOT_ALLOW.id &&
      withOtherValueOption,
    nextPaymentDate: nextPaymentDate,
    nextPaymentValue: nextPaymentValue,
  };
};

const mapAccountsPaymentsApiToEntities = (
  accountPayments: Record<string, string | number | object>[],
  withNextValueOption: boolean,
  withOtherValueOption: boolean,
  withExpiredValueOption: boolean,
  withTotalValueOption: boolean,
): IPayment[] => {
  return accountPayments.map((payment) =>
    mapAccountsPaymentApiToEntity(
      payment,
      withNextValueOption,
      withOtherValueOption,
      withExpiredValueOption,
      withTotalValueOption,
    ),
  );
};

export { mapAccountsPaymentApiToEntity, mapAccountsPaymentsApiToEntities };
