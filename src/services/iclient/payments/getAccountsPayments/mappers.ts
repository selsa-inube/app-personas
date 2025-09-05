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
    String(accountPayment.paymentOtherValueAvailable),
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
    id: String(accountPayment.obligationNumber),
    title: capitalizeText(
      String(accountPayment.productDescription).toLowerCase(),
    ),
    group: EPaymentGroupType.ACCOUNTSRECEIVABLE,
    paymentMethodName,
    status: inArrears
      ? EPaymentStatusType.ARREARS
      : EPaymentStatusType.ANYWHERE,
    options,
    tags,
    supportDocumentType: ESupportDocumentType.ACCOUNTSPAYABLE,
    paymentMethod: String(accountPayment.paymentMethod),
    allowCustomValue:
      otherValueAvailable !== otherValueAvailableDM.NOT_ALLOW.id,
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
